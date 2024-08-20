import React from "react";
import { Form, Input, Button, Col, Row } from "antd";
import { useRecruitmentContext } from "../context";
import FormInputs from "../../../components/Shared/InputTypes/FormInputs";
import { references } from "../columns/constants";

const ApplicantForm: React.FC<{}> = ({}) => {
  const [form] = Form.useForm();

  const { editingRecord, handleFileChange } = useRecruitmentContext();

  return (
    <Form form={form} layout="vertical" initialValues={editingRecord}>
      <Form.Item label="Name" name="name">
        <Input />
      </Form.Item>
      <Form.Item label="Surname" name="surname">
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input />
      </Form.Item>
      <Form.Item label="Position" name="position">
        <Input />
      </Form.Item>
      <FormInputs.Select
        name="reference"
        label="Reference"
        options={references}
      />
      <Form.Item label="CV" name="cv" valuePropName="cv">
        <Input
          type="file"
          name="cv"
          size="large"
          // onChange={handleFileChange()}
        />
      </Form.Item>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item>
            <Button type="default">Reject</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default ApplicantForm;
