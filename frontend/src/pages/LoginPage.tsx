import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "../styles/LoginPage.css";
import NavigationMenuLogo from "../components/Navigation/NavigationMenuLogo";

import { useNavigate } from "react-router-dom";

const LoginPAge: React.FC = () => {
  const navigate = useNavigate();
  const onFinish = (values: unknown) => {
    console.log("Received values of form:", values);
  };

  return (
    <div className="login-page">
      <Form
        name="normal-login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <NavigationMenuLogo logotext={"HRSoftware"} />
        <h2 className="login-title">Login</h2>
        <Form.Item
          name="username"
          className="username-input"
          rules={[{ required: true, message: "Please input your username" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          className="password-input"
          rules={[{ required: true, message: "Please input your password" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={() => navigate('dashboard')}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPAge;
