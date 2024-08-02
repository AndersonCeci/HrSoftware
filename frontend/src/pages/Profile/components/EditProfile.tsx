import { Form, Modal, Upload, message } from "antd";
import type { GetProp, UploadProps } from "antd";
import {  useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import FormInputs from "../../../components/Shared/InputTypes/FormInputs";
// import useHttp from "../../../hooks/useHttp";

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



const EditProfile: React.FC = ({ visible, handleOk, handleCancel }) => {
// const API = import.meta.env.REACT_APP_EMPLOYEE_API;

//     const [isLoading, error, sendRequest] = useHttp();

//     useEffect(() => {
//         sendRequest(
//             {
//                 url: `${API}/${id}`,
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             },
//             setTableData,
//         );
//     }, []);
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

  return (
    <>
      <Modal
        title="Edit Profile"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
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
