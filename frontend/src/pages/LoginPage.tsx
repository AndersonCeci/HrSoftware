import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import "../styles/LoginPage.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../hooks/useHttp";

import Login from "../assets/login.svg";
import LoginLogo from "../assets/loginlogo.png";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, error, sendRequest] = useHttp();
  const navigate = useNavigate();

  const onFinish = (values: unknown) => {
    console.log("Received values of form:", values);
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  // 	e.preventDefault();
  // 	try {
  // 		const response = await fetch("http://localhost:3000/login", {
  // 			method: "POST",
  // 			headers: { "Content-Type": "application/json" },
  // 			body: JSON.stringify({ username, password }),
  // 		});
  // 		const data = await response.json();

  // 		if (!response.ok) {
  // 			throw new Error(data.message || "Authentication failed");
  // 		}

  // 		const userData = {
  // 			token: data.accessToken,
  // 			username: data.username,
  // 			userId: data._id,
  // 			role: data.role,
  // 			loginRole: data.loginRole,
  // 		};

  // 		localStorage.setItem("userData", JSON.stringify(userData));

  // 		console.log("Logged in successfully");
  // 		navigate("/dashboard");
  // 	} catch (error) {
  // 		console.error("Login error:", error);
  // 	}
  // };

  function handleSubmit() {
    if (!username || !password) {
      console.log("Please fill in all fields");
      return;
    }

    sendRequest(
      {
        url: "http://localhost:3000/login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { username, password },
      },
      (responseData: any) => {
        console.log(responseData);
        const userData = {
          token: responseData.accessToken,
          username: responseData.username,
          userId: responseData._id,
          role: responseData.role,
          loginRole: responseData.loginRole,
          employID: responseData.employID,
        };

        localStorage.setItem("userData", JSON.stringify(userData));
        navigate("/dashboard");
      },
    );
  }

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    console.log(userData);
    if (userData) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="login-page">
      <div className="image-container">
        <img src={Login} alt="Logo" />
      </div>
      <Form
        name="normal-login"
        className="login-form"
        initialValues={{ remember: true }}
        // onFinish={handleSubmit}
      >
        <img src={LoginLogo} className="loginlogo"></img>
        <div className="login-inputs">
          <h2 className="login-title">Login</h2>
          <Form.Item
            name="username"
            className="username-input"
            rules={[{ required: true, message: "Please input your email" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="E-mail"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Item>
          <Form.Item
            name="password"
            className="password-input"
            rules={[{ required: true, message: "Please input your password" }]}
          >
            <Input.Password
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              // htmlType="submit"
              className="login-form-button"
              onClick={handleSubmit}
            >
              {isLoading ? "Loading..." : "Log in"}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
