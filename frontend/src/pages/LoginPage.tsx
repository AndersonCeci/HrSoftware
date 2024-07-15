import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "../styles/LoginPage.css";
import NavigationMenuLogo from "../components/Navigation/NavigationMenuLogo";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onFinish = (values: unknown) => {
    console.log("Received values of form:", values);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth-v2/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Authentication failed");
      }
  
      const userData = {
        token: data.accessToken,
        username: data.username,
        userId: data._id,
        role: data.role,
        loginRole: data.loginRole
      };

        localStorage.setItem('userData', JSON.stringify(userData));

      console.log("Logged in successfully");
      navigate("/dashboard");

    } catch (error) {
      console.error("Login error:", error);
    }
  };
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData') || "{}");
    if(userData.token) {
      navigate("/dashboard");
    }
  },[navigate])

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
            onChange={(e) => setUsername(e.target.value)}
            required
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
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={handleSubmit}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
