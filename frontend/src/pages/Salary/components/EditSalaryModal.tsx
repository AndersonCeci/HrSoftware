import React, { MutableRefObject, useContext } from "react";
import Modal from "../../../components/Shared/Modal";
import Form from "antd/es/form";
import { DatePicker, Input, message, Spin, Select } from "antd";
import { ModalContext, SalaryContext } from "../context";
import moment from "moment";
import axios from "axios";
import { EmployeeDataType } from "../../Employment/types/Employee";
const API = import.meta.env.REACT_APP_EMPLOYEE_SEARCH_API;
const { Search } = Input;
const { Option } = Select;

interface EditSalaryProps {
  editFormRef: MutableRefObject<any>;
  handleEditSubmit: (values: any) => void;
  handleCreateSubmit: (values: any) => void;
}

const fetchEmployee = async (name: string, surname: string) => {
  try {
    const res = await axios.get(API, {
      params: { name, surname },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    message.error("Failed to fetch employee");
    return null;
  }
};

const EditSalaryModal: React.FC<EditSalaryProps> = ({
  editFormRef,
  handleEditSubmit,
  handleCreateSubmit,
}) => {
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [employeeDet, setEmployeeDet] = React.useState<EmployeeDataType[] | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const { selectedSalary } = useContext(SalaryContext)!;
  const { isEditModalOpen, setIsEditModalOpen } = useContext(ModalContext)!;
  const defaultDate = selectedSalary?.dateTaken ? moment(new Date(selectedSalary.dateTaken)) : null;
  const title = selectedSalary ? "Edit Salary: " : "Add Salary";

  const handleSearch = async () => {
    setLoading(true);
    const [name, surname] = searchValue.split(" ");
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

  return (
    <Modal
      isOpen={isEditModalOpen}
      onCancel={() => setIsEditModalOpen(false)}
      onOk={handleModalOk}
    >
      <Form
        ref={editFormRef}
        id="edit-salary-form"
        onFinish={selectedSalary ? handleEditSubmit : handleCreateSubmit}
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
                <Form.Item label="Surname" name={["employeeDetails", "surname"]}>
                  <Input disabled />
                </Form.Item>
              </>
            ) : (
              <>
                <Search
                  placeholder="Enter employee name"
                  style={{ width: 300 }}
                  onSearch={handleSearch}
                  enterButton
                  allowClear
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </>
            )}
            {(selectedSalary || employeeDet) && (
              <>
                {employeeDet && employeeDet.length > 0 && (
                  <Form.Item
                    label="Employee"
                    name="employeeID"
                    rules={[{ required: true, message: "Employee is required" }]}
                  >
                    <Select>
                      {employeeDet.map((employee) => (
                        <Option key={employee._id} value={employee._id}>
                          {`${employee.name} ${employee.surname}`}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                )}
                <Form.Item
                  label="Net Salary"
                  name="netSalary"
                  rules={[{ required: true, message: "Net Salary is required" }]}
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item
                  label="Date taken"
                  name="dateTaken"
                  rules={[{ required: true, message: "Date taken is required" }]}
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
                <Form.Item
                  label="Health Insurance"
                  name="healthInsurance"
                  rules={[{ required: true, message: "Health Insurance is required" }]}
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item
                  label="Social Security Contributions"
                  name="socialSecurityContributions"
                  rules={[
                    { required: true, message: "Social Security Contributions is required" },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item
                  label="Gross Salary"
                  name="grossSalary"
                  rules={[{ required: true, message: "Gross Salary is required" }]}
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item
                  label="Total"
                  name="total"
                  rules={[{ required: true, message: "Total is required" }]}
                >
                  <Input type="number" />
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
