import React from "react";
import { Form, Button, Col, Row, Upload, UploadProps, message } from "antd";
import { useRecruitmentContext } from "../context";
import FormInputs from "../../../components/Shared/InputTypes/FormInputs";
import { references } from "../columns/constants";
import { getDevRoles } from "../../Employment/utils/helperFunctions";
import { UploadOutlined } from "@ant-design/icons";

const ApplicantForm: React.FC = () => {
  const { handleFileChange, setFile } =
    useRecruitmentContext();
  const positions = getDevRoles().map((role) => ({ value: role, label: role }));

  const allowedFileTypes = ["application/pdf", "application/msword"];

  const props: UploadProps = {
    beforeUpload: (file) => {
      console.log(file.type);
      const isSupported = allowedFileTypes.includes(file.type);
      if (!isSupported) {
        message.error(`${file.name} is not a supported file type.`);
      }
      return isSupported || Upload.LIST_IGNORE;
    },
    onChange: async (info) => {
      if (info.file.status === "done") {
        console.log(info.file.originFileObj);
        setFile(info.file.originFileObj);
        handleFileChange();
      } else {
        console.log("be humble");
      }
    },
    progress: {
      trailColor: "red",
      strokeWidth: 2,
      showInfo: true,
    },
    onRemove: () => {
      setFile(null);
    },
    maxCount: 1,
    multiple: false,
    customRequest: async ({ file, onSuccess, onError }) => {
      const formData = new FormData();
      formData.append("file", file);

      try {
        setFile(file as File);
        if (onSuccess) {
          onSuccess("Upload successful!");
        }
      } catch (error) {
        message.error("File upload failed.");
        if (onError) {
          onError(new Error("Upload failed"));
        }
      } finally {
        handleFileChange();
      }
    },
  };

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <FormInputs.Input label="Name" name="name" />
        </Col>
        <Col span={12}>
          <FormInputs.Input label="Surname" name="surname" />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <FormInputs.Input label="Email" name="email" />
        </Col>
        <Col span={12}>
          <FormInputs.Select
            name="position"
            label="Position"
            options={positions}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <FormInputs.Select
            name="reference"
            label="Reference"
            options={references}
          />
        </Col>
        <Col span={12}>
          <Form.Item label="Resume" name="cv" valuePropName="cv">
            <Upload {...props}>
              <Button
                icon={<UploadOutlined />}
                style={{
                  width: "315px",
                  height: "40px",
                }}
              >
                Upload Resume
              </Button>
            </Upload>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default ApplicantForm;
