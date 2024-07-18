import { Col, Form, Input, Row } from "antd";



const FirstStep: React.FC = () => {
  const [form] = Form.useForm();

// useEffect(()=>{
//   if(data) {

//   }
// }, [])

  return (
    <Form layout="vertical" form={form} style={{ marginTop: "20px" }}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input size="large" placeholder="Enter the name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Surname"
            name="surname"
            rules={[{ required: true, message: "Please enter a surname" }]}
          >
            <Input size="large" placeholder="Enter a surname" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter an email" }]}
          >
            <Input size="large" placeholder="Enter an email" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter a password" }]}
          >
            <Input
              size="large"
              placeholder="Enter a password"
              type="password"
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default FirstStep;
