import { Form, Input, Modal, Select } from "antd";

import { useRef, useEffect } from "react";
import { RecrutmentDataType } from "../types/RecruitmentDataTypes";
import TextField from "../../../components/Shared/TextField";

type EditModalProps = {
  open: boolean;
  onClose: () => void;
  modalTitle: string;
  onSubmit: (values: RecrutmentDataType) => void;
  data: RecrutmentDataType | null;
  options: { value: string; label: string }[];
  handleUploadFile?: () => void;
};

const TableModal: React.FC<EditModalProps> = ({
  onClose,
  open,
  modalTitle,
  onSubmit,
  data,
  options,
  handleUploadFile,
}) => {
  const [form] = Form.useForm();
  const formRef = useRef<RecrutmentDataType>(null);

  useEffect(() => {
    if (data) {
      console.log(data);
      form.setFieldsValue(data);
    }
  }, [data, form]);

  return (
    <Modal
      open={open}
      title={modalTitle}
      onOk={() => form.submit()}
      onCancel={onClose}
      destroyOnClose
    >
      <Form
        initialValues={{ remember: true }}
        ref={formRef}
        form={form}
        layout="vertical"
        onFinish={onSubmit}
      >
        <TextField
          label="Name"
          name={"name"}
          placeholder="Name"
          size="large"
          rules={[{ required: true, message: "Please enter an email" }]}
        />
        <TextField
          label={"Email"}
          name={"email"}
          rules={[{ required: true, message: "Please enter an email" }]}
          placeholder="Enter an email"
        />
        <Form.Item
          label="Stage"
          name="stage"
          rules={[{ required: true, message: "Please enter a stage" }]}
        >
          <Select options={options} placeholder="Select a stage" />
        </Form.Item>
        <TextField label="Position" name={"position"} placeholder="Position" />
        <TextField
          label="Reference"
          name={"reference"}
          placeholder="Position"
        />
      </Form>
    </Modal>
  );
};

export default TableModal;
