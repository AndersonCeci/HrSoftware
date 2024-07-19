import React, { MutableRefObject } from "react";
import Modal from "../../../components/Shared/Modal";
import Form from "antd/es/form";
import { Input } from "antd";
import { Salary } from "../../../types/SalaryProps";

interface EditSalaryProps {
  isEditModalOpen: boolean;
  editFormRef: MutableRefObject<any>;
  setIsEditModalOpen: (isOpen: boolean) => void;
  handleEditSubmit: (values: any) => void;
  selectedSalary: Salary | undefined;
}

const EditSalaryModal: React.FC<EditSalaryProps> = ({
  isEditModalOpen,
  editFormRef,
  setIsEditModalOpen,
  handleEditSubmit,
  selectedSalary,
}) => {
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
        }}
        style={{ padding: 35 }}
      >
        <h2>Edit Salary </h2>
        <div
        //   style={{
        //     display: "grid",
        //     gridTemplateColumns: " repeat(2, 1fr)",
        //     gap: "1rem",
        //     margin: "1.5rem",
        //   }}
        >
          <Form.Item label="ID" name="employeeID">
            <Input disabled />
          </Form.Item>
          <Form.Item label="NSSH" name="NSSH">
            <Input />
          </Form.Item>
          <Form.Item label="Net Salary" name="netSalary">
            <Input type="number" />
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
