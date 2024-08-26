import { message } from "antd";
import axios, { AxiosError } from "axios";
import React, { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

interface PasswordContextProps {
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
}

const PasswordContext = createContext<PasswordContextProps | undefined>(
  undefined,
);

export const PasswordProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const token = userData.token;

  if (!token) {
    message.error("No token found. Please login again.");
    localStorage.removeItem("userData");
    navigate("/login");
    return;
  }

  const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
      await axios.put(
        "http://localhost:3000/users/change-password",
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      message.success("Password changed successfully!");
    } catch (error) {
      if (error instanceof AxiosError) {
        message.error(
          `Failed to change password: ${
            error.response?.data.message || error.message
          }`,
        );
      }
    }
  };

  return (
    <PasswordContext.Provider value={{ changePassword }}>
      {children}
    </PasswordContext.Provider>
  );
};

export const usePassword = () => {
  const context = useContext(PasswordContext);
  if (!context) {
    throw new Error("usePassword must be used within a PasswordProvider");
  }
  return context;
};
