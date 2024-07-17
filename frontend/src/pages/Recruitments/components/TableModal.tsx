import { Form, Input, Modal, Select } from "antd";

import { useRef, useEffect } from "react";
import { RecrutmentDataType } from "../types/RecruitmentDataTypes";


type EditModalProps = {
  open: boolean;
  onClose: () => void;
  modalTitle: string;
  onSubmit: (values: RecrutmentDataType) => void;
  data: RecrutmentDataType | null;
  options: { value: string; label: string }[];
};

const TableModal: React.FC<EditModalProps> = ({
  onClose,
  open,
  modalTitle,
  onSubmit,
  data,
  options,
}) => {
    const [ form ] = Form.useForm();
    const formRef = useRef<RecrutmentDataType>(null);
    
  useEffect(() => {
    if ( data )
    {
      console.log(data)
      form.setFieldsValue(data);
    }
  }, [data, form]);

  return (
    <Modal
      open={open}
      title={modalTitle}
      onOk={() => form.submit()}
      onCancel={onClose}
    >
      <Form ref={formRef} form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter a name" }]}
        >
          <Input size="large" placeholder="Enter the name" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter an email" }]}
        >
          <Input size="large" placeholder="Enter an email" />
        </Form.Item>
        <Form.Item
          label="Stage"
          name="stage"
          rules={[{ required: true, message: "Please enter a stage" }]}
        >
          <Select options={options} placeholder="Select a stage" />
        </Form.Item>
        <Form.Item
          label="Position"
          name="position"
          rules={[{ required: true, message: "Please enter an email" }]}
        >
          <Input size="large" placeholder="Position" />
        </Form.Item>
        <Form.Item
          label="Reference"
          name="reference"
        >
          <Input size="large" placeholder="Reference" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TableModal;
