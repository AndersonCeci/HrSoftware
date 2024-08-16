import React, { MutableRefObject, useContext } from "react";
import Modal from "../../../components/Shared/Modal";
import Form from "antd/es/form";
import { DatePicker, Input, message, Spin, Select, InputNumber, Button } from "antd";
import { ModalContext, SalaryContext } from "../context";
import moment from "moment";
import axios, { AxiosError } from "axios";
import { EmployeeDataType } from "../../Employment/types/Employee";

const API = import.meta.env.REACT_APP_EMPLOYEE_SEARCH_API;
const SALARY_API = import.meta.env.REACT_APP_SALARY;
const { Option } = Select;

interface EditSalaryProps {
  editFormRef: MutableRefObject<any>;
  handleEditSubmit: (values: any) => void;
  handleCreateSubmit: (values: any) => void;
}

export interface Payroll {
  netSalary: number;
  socialInsuranceEmployee: number;
  healthInsuranceEmployee: number;
  incomeTax: number;
  socialInsuranceCompany: number;
  healthInsuranceCompany: number;
  newGrossSalary: number;
}

const fetchEmployee = async (name: string, surname: string) => {
  try {
    const res = await axios.get(API, {
      params: { name, surname },
    });
    return res.data;
  } catch (error) {
    message.error("Failed to fetch employee");
    return null;
  }
};

const getPayroll = async (
  grossSalary: number,
  workDays: number
): Promise<Payroll | null> => {
  try {
    const res = await axios.get(`${SALARY_API}/net-salary`, {
      params: { grossSalary, workDays },
    });
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      message.error(error.response?.data.errorDetails.message || error.message);
    } else {
      console.error("Cannot calculate salary", error);
      message.error("Failed to calculate salary.");
    }
    return null;
  }
};

const EditSalaryModal: React.FC<EditSalaryProps> = ({
  editFormRef,
  handleEditSubmit,
  handleCreateSubmit,
}) => {
  const [employeeDet, setEmployeeDet] = React.useState<
    EmployeeDataType[] | null
  >(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const { selectedSalary } = useContext(SalaryContext)!;
  const { isEditModalOpen, setIsEditModalOpen } = useContext(ModalContext)!;
  const defaultDate = selectedSalary?.dateTaken
    ? moment(new Date(selectedSalary.dateTaken))
    : null;
  const title = selectedSalary ? "Edit Salary: " : "Add Salary";

  const handleSearch = async (value: string) => {
    setLoading(true);
    const [name, surname] = value.split(" ");
    const data = await fetchEmployee(name, surname);
    if (data) {
      setEmployeeDet(data);
    }
    setLoading(false);
  };

  const handleModalOk = () => {
    if (selectedSalary) {
      editFormRef.current.submit();
    } else {
      handleCreateSubmit(editFormRef.current.getFieldsValue());
    }
  };

  const handleFinish = async (values: any) => {
    if (selectedSalary) {
      handleEditSubmit(values);
    } else {
      handleCreateSubmit(values);
    }
    editFormRef.current.resetFields();
  };

  const calculatePayroll = async () => {
    const { grossSalary, workDays } = editFormRef.current.getFieldsValue();
    if (grossSalary && workDays) {
      const payroll = await getPayroll(parseInt(grossSalary), parseInt(workDays));
      if (payroll) {
        editFormRef.current.setFieldsValue({
          netSalary: payroll.netSalary,
          socialSecurityContributions: payroll.socialInsuranceEmployee,
          healthInsurance: payroll.healthInsuranceEmployee,
          incomeTax: payroll.incomeTax,
          socialInsuranceCompany: payroll.socialInsuranceCompany,
          healthInsuranceCompany: payroll.healthInsuranceCompany,
          newGrossSalary: payroll.newGrossSalary,
          total: grossSalary,
        });
      }
    }
  };

  return (
    <Modal
      isOpen={isEditModalOpen}
      onCancel={() => {
        setIsEditModalOpen(false);
        editFormRef.current.resetFields();
      }}
      onOk={handleModalOk}
    >
      <Form  
        ref={editFormRef}
        id="edit-salary-form"
        onFinish={handleFinish}
        initialValues={{
          ...selectedSalary,
          _id: selectedSalary?._id,
          employeeID: selectedSalary?.employeeID,
          employeeDetails: {
            name: selectedSalary?.employeeDetails?.name,
            surname: selectedSalary?.employeeDetails?.surname,
            NSSH: selectedSalary?.employeeDetails?.NSSH,
          },
          dateTaken: defaultDate,
        }}
        style={{ padding: 35 }}
      >
        <h2>{title}</h2>
        <Spin spinning={loading}>
          <div>
            {selectedSalary?.employeeDetails ? (
              <>
                <Form.Item label="Name" name={["employeeDetails", "name"]}>
                  <Input disabled />
                </Form.Item>
                <Form.Item
                  label="Surname"
                  name={["employeeDetails", "surname"]}
                >
                  <Input disabled />
                </Form.Item>
              </>
            ) : (
              <Form.Item
                label="Employee"
                name="employeeID"
                rules={[{ required: true, message: "Employee is required" }]}
              >
                <Select
                  showSearch
                  placeholder="Search for an employee"
                  onSearch={handleSearch}
                  filterOption={(input, option) =>
                    (option?.children as unknown as string)
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  {employeeDet && employeeDet.length > 0 ? (
                    employeeDet.map((employee) => (
                      <Option key={employee._id} value={employee._id}>
                        {`${employee.name} ${employee.surname}`}
                      </Option>
                    ))
                  ) : (
                    <Option value="">No Employee Found</Option>
                  )}
                </Select>
              </Form.Item>
            )}
            {(selectedSalary || employeeDet) && (
              <>
                <Form.Item
                  label="Gross Salary"
                  name="grossSalary"
                  rules={[
                    { required: true, message: "Gross Salary is required" },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  label="Date taken"
                  name="dateTaken"
                  rules={[
                    { required: true, message: "Date taken is required" },
                  ]}
                >
                  <DatePicker picker="month" />
                </Form.Item>
                <Form.Item
                  label="Work Days"
                  name="workDays"
                  rules={[{ required: true, message: "Work days is required" }]}
                >
                  <Input type="number" />
                </Form.Item>
                <Button onClick={calculatePayroll}>Calculate Payroll</Button>
                <Form.Item
                  label="Net Salary"
                  name="netSalary"
                  rules={[
                    { required: true, message: "Net Salary is required" },
                  ]}
                >
                  <Input type="number" disabled />
                </Form.Item>
                <Form.Item label="Income Tax" name="incomeTax">
                  <Input type="number" disabled />
                </Form.Item>
                <Form.Item
                  label="Health Insurance"
                  name="healthInsurance"
                  rules={[
                    { required: true, message: "Health Insurance is required" },
                  ]}
                >
                  <Input type="number" disabled />
                </Form.Item>
                <Form.Item
                  label="Social Security Contributions"
                  name="socialSecurityContributions"
                  rules={[
                    {
                      required: true,
                      message:
                        "Social Security Contributions is required",
                    },
                  ]}
                >
                  <Input type="number" disabled />
                </Form.Item>
                <Form.Item
                  label="Social Insurance Company"
                  name="socialInsuranceCompany"
                  rules={[
                    { required: true, message: "Social Insurance Company is required" },
                  ]}
                >
                  <Input type="number" disabled />
                </Form.Item>
                <Form.Item
                  label="Health Insurance Company"
                  name="healthInsuranceCompany"
                  rules={[
                    { required: true, message: "Health Insurance Company is required" },
                  ]}
                >
                  <Input type="number" disabled />
                </Form.Item>
                <Form.Item
                  label="New Gross Salary"
                  name="newGrossSalary"
                  rules={[
                    { required: true, message: "New Gross Salary is required" },
                  ]}
                >
                  <Input type="number" disabled />
                </Form.Item>
                <Form.Item
                  label="Total"
                  name="total"
                  rules={[
                    { required: true, message: "Total is required" },
                  ]}
                >
                  <Input type="number" disabled />
                </Form.Item>
              </>
            )}
          </div>
        </Spin>
      </Form>
    </Modal>
  );
};

export default EditSalaryModal;
