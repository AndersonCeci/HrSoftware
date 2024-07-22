import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "antd";
import { Content } from "antd/es/layout/layout";
import WelcomeGrid from "../components/Dashboard/WelcomeGrid";
import CalendarGrid from "../components/Dashboard/CalendarGrid";
import TaskGrid from "../components/Dashboard/TaskGrid";

export interface Data {
	noEmployee: number;
	status: string;
	color: string;
}
const initialData: Data[] = [
	{
		noEmployee: 300,
		status: "Active Employee",
		color: "#ccffcc",
	},
	{
		noEmployee: 100,
		status: "Remote Employee",
		color: "#F0E6FA",
	},
	{
		noEmployee: 50,
		status: "Dismissed Employee",
		color: "#ceebfd",
	},
];
const DashboardPage: React.FC = () => {
	const navigate = useNavigate();

	// useEffect(() => {
	//   const verifyToken = async (token: string) => {
	//     try {
	//       const response = await fetch('http://localhost:3000/verify', {
	//         method: 'GET',
	//         headers: {
	//           'Authorization': `Bearer ${token}`,
	//         },
	//       });

	//       if (!response.ok) {
	//         throw new Error('Token is invalid or expired');
	//       }

	//       const data = await response.json();
	//     } catch (error) {
	//       console.error(error);
	//       navigate('/');
	//     }
	//   };

	//   const userData = JSON.parse(localStorage.getItem("userData") || "{}");
	//   if (!userData.token) {
	//     navigate("/");
	//   } else {
	//     verifyToken(userData.token);
	//   }
	// }, [navigate]);

	return (
		<Content
			className="site-layout-background"
			style={{ margin: "24px 16px", padding: 10, minHeight: "750px", color: "grey" }}
		>
			<Row gutter={[16, 16]} className="dashboard-main">
				<Col span={12}>
					<WelcomeGrid initialData={initialData} />
				</Col>
				<Col span={12}>
					<CalendarGrid />
				</Col>
			</Row>
			<TaskGrid />
		</Content>
	);
};

export default DashboardPage;
