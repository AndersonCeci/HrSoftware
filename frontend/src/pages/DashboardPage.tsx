import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async (token: string) => {
      try {
        const response = await fetch('http://localhost:3000/auth/verify', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Token is invalid or expired');
        }

        const data = await response.json();
      } catch (error) {
        console.error(error);
        navigate('/');
      }
    };

    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    if (!userData.token) {
      navigate("/");
    } else {
      verifyToken(userData.token);
    }
  }, [navigate]);

  return (
    <div>
      Welcome to the Dashboard
    </div>
  );
};

export default DashboardPage;
