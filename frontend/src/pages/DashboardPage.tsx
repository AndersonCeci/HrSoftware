import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    if (!userData.token) {
      navigate("/");
    }
  }, [navigate]);
  return null;
};

export default DashboardPage;
