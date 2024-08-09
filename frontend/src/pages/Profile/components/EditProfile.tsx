import { Form, Modal, Upload, message } from "antd";
import type { GetProp, UploadProps } from "antd";
import { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import FormInputs from "../../../components/Shared/InputTypes/FormInputs";
import { EmployeeDataType } from "../../Employment/types/Employee";
import { useTranslation } from "react-i18next";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const EditProfile = ({ visible, handleOk, handleCancel, currentData }) => {
  const [form] = Form.useForm<EmployeeDataType>();
  const { t } = useTranslation();

  useEffect(() => {
    if (currentData) {
      form.setFieldsValue({
        phoneNumber: currentData.phoneNumber,
      });
    }
  }, [currentData, form]);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const onFinish = (values: any) => {
    handleOk(values);
  };

  return (
    <>
      <Modal
        title={t("editProfile")}
        visible={visible}
        onOk={() => form.submit()}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <Upload
              name="avatar"
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <FormInputs.Input
            label="Phone Number"
            name="phoneNumber"
            defaultValidateRule="phoneNumber"
          />
        </Form>
      </Modal>
    </>
  );
};
export default EditProfile;
