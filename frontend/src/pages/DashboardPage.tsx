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
