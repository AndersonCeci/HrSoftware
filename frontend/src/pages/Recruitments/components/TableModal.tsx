import { Button, Form, Input, Modal, Select, Upload } from "antd";

import { useRef, useEffect, useState } from "react";
import { RecrutmentDataType } from "../types/RecruitmentDataTypes";
import TextField from "../../../components/Shared/TextField";
import { UploadOutlined } from "@ant-design/icons";

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
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (data) {
      console.log(data);
      form.setFieldsValue(data);
    }
  }, [data, form]);

 
   const handleUpload = async (file: File) => {
     const formData = new FormData();
     formData.append("file", file);
console.log(formData, 'formDataaa')
     try {
       const uploadResponse = await fetch(
         "http://localhost:3000/files/upload",
         {
           method: "POST",
           body: formData,
         }
       );

       if (!uploadResponse.ok) {
         throw new Error("File upload failed");
       }

       const uploadData = await uploadResponse.json();
       const fileUrl = uploadData.fileUrl;

       form.setFieldsValue({ cv: fileUrl });
       setFile(file);
     } catch (error) {
       console.error("File upload error:", error);
     }
   };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[ 0 ];
    console.log(file, 'fileeee')
    if (file) {
      handleUpload(file);
    }
  };

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
          label="Surname"
          name={"surname"}
          placeholder="Surname"
          size="large"
          rules={[{ required: true, message: "Please enter a surname" }]}
        />
        <TextField
          label={"Email"}
          name={"email"}
          rules={[{ required: true, message: "Please enter an email" }]}
          placeholder="Enter an email"
        />
        <Form.Item label="CV" name="cv" valuePropName="cv">
          <Input type="file" name="cv" onChange={handleFileChange} />
        </Form.Item>
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
