import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Upload,
} from "antd";
// import { useRef} from "react";
import { EuroCircleOutlined, UploadOutlined } from "@ant-design/icons";

const SecondStep: React.FC = () => {
  const [form2] = Form.useForm();
  // const addWorkerFormRef = useRef();

  const position = [
    { label: "Frontend Developer", value: "frontend" },
    { label: "Backend Developer", value: "backend" },
    { label: "Fullstack Developer", value: "fullstack" },
  ];

  return (
    <Form
      // ref={addWorkerFormRef}
      form={form2}
      layout="vertical"
      // onFinish={handleSubmit}
      style={{ marginTop: "20px" }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Name" name="name">
            <Input size="large" value={FormData.name} readOnly />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Surname" name="surname">
            <Input size="large" readOnly />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Position"
            name="position"
            rules={[{ required: true, message: "Plese enter an position" }]}
          >
            <Select
              size="large"
              options={position}
              placeholder="Choose a position"
              value={"test"}
              onChange={() => console.log("test")}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Salary"
            name="salary"
            rules={[{ required: true, message: "Please enter a password" }]}
          >
            <Input
              prefix={<EuroCircleOutlined style={{ color: "#c8c8c8" }} />}
              size="large"
              placeholder="Enter a salary amount"
              type="number"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Starting on"
            name="starting"
            rules={[
              { required: true, message: "Please enter a starting date" },
            ]}
          >
            <DatePicker
              size="large"
              style={{ width: "685px" }}
              format={"MM/DD/YYYY"}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Contract" name="starting">
            <Upload>
              <Button
                size="large"
                style={{ width: "685px", color: "#c8c8c8" }}
                icon={<UploadOutlined />}
              >
                Click to upload
              </Button>
            </Upload>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default SecondStep;
