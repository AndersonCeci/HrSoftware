import React, { MutableRefObject, useContext } from "react";
import Modal from "../../../components/Shared/Modal";
import Form from "antd/es/form";
import { DatePicker, Input } from "antd";
import { ModalContext, SalaryContext } from "../context";
import moment from "moment";


interface EditSalaryProps {
  editFormRef: MutableRefObject<any>;
  handleEditSubmit: (values: any) => void;
}

const EditSalaryModal: React.FC<EditSalaryProps> = ({
  editFormRef,
  handleEditSubmit,
}) => {
  const { selectedSalary } = useContext(SalaryContext)!;
  const { isEditModalOpen, setIsEditModalOpen } = useContext(ModalContext)!;
  const defaultDate = selectedSalary?.dateTaken
  ? moment(new Date(selectedSalary.dateTaken))
  : null;
  return (
    <Modal
      isOpen={isEditModalOpen}
      onCancel={() => setIsEditModalOpen(false)}
      onOk={() => editFormRef.current.submit()}
    >
      <Form
        ref={editFormRef}
        id="edit-salary-form"
        onFinish={handleEditSubmit}
        initialValues={{
          ...selectedSalary,
          employeeDetails: {
            name: selectedSalary?.employeeDetails?.name,
            surname: selectedSalary?.employeeDetails?.surname,
            NSSH: selectedSalary?.employeeDetails?.NSSH,
          },
          dateTaken: defaultDate,
        }}
        style={{ padding: 35 }}
      >
        <h2>Edit Salary </h2>
        <div>
          <Form.Item label="Name" name={["employeeDetails", "name"]}>
            <Input disabled />
          </Form.Item>
          <Form.Item label="surname" name={["employeeDetails", "surname"]}>
            <Input disabled />
          </Form.Item>

          <Form.Item label="Net Salary" name="netSalary">
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Date taken" name="dateTaken">
            <DatePicker picker="month" />
          </Form.Item>
          <Form.Item label="Work Days" name="workDays">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Health Insurance" name="healthInsurance">
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Social Security Contributions"
            name="socialSecurityContributions"
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Gross Salary" name="grossSalary">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Total" name="total">
            <Input type="number" />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default EditSalaryModal;
