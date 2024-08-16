import { Row, Col, Typography } from "antd";
import { Doughnut } from "react-chartjs-2";
import WelcomeGrid from "./components/WelcomeGrid";
import CalendarGrid from "./components/CalendarGrid";
import TaskGrid from "./components/TaskGrid";
import "./styles/Dashboard.css";
import { t } from "i18next";
import { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";

export interface Data {
	noEmployee: number;
	status: string;
	color: string;
	path: string;
}

const { Title, Text } = Typography;

const DELETED_API = import.meta.env.REACT_APP_DELETE_EMPLOYEE_API;
const EMPLOYEE_API = import.meta.env.REACT_APP_EMPLOYEE_API;

const DashboardPage = () => {
	const data = {
		datasets: [
			{
				label: "Days",
				data: [6, 1],
				backgroundColor: ["#73dbfe", "#fe7570"],
				borderColor: ["#fe7570", "#fe7570"],
			},
		],
		labels: ["At work", "Leaves"],
	};

	const [deletedEmployee, setDeletedEmployee] = useState([]);
	const [employee, setEmployee] = useState([]);
	const [isLoading, error, sendRequest] = useHttp();

	useEffect(() => {
		sendRequest({ url: DELETED_API }, (data) => {
			setDeletedEmployee(data);
		});

		sendRequest({ url: EMPLOYEE_API }, (data) => {
			setEmployee(data);
		});
	}, []);

	const initialData: Data[] = [
		{
			noEmployee: employee.length,
			status: t("activestatus"),
			color: "active-employee",
			path: "/management/employment",
		},
		{
			noEmployee: 100,
			status: t("remoteEmployee"),
			color: "remote-employee",
			path: "/management/employment",
		},
		{
			noEmployee: deletedEmployee.length,
			status: t("dismissed"),
			color: "dismissed-employee",
			path: "/management/dismissed",
		},
	];

	const { userId, token, role, username, loginRole } = JSON.parse(
		localStorage.getItem("userData") || "{}",
	);

	//! FUTURE ILVIO YOU BETTER NOT FORGET TO REMOVE THIS. With love, Past Ilvio.
	const temp = userId + token + role + username + loginRole;

	return (
		<main className="dashboard-page">
			<Row gutter={10} className="dashboard-main">
				<Col span={24}>
					<WelcomeGrid initialData={initialData} />
				</Col>
			</Row>
			<Row>
				<Col
					xl={{
						span: 10,
					}}
					lg={{
						span: 20,
					}}
				>
					<CalendarGrid />
				</Col>
				<Col
					xl={{
						span: 6,
						offset: 2,
					}}
					lg={{
						span: 24,
					}}
				>
					<div className="pie-chart">
						<Title style={{ marginTop: 15, color: "#666666", textAlign: "center", fontSize: 23 }}>
							{t(`attendanceOverview`)}
						</Title>
						<Doughnut style={{ marginTop: "15px" }} data={data} options={{}}></Doughnut>
					</div>
				</Col>
				<Col
					xl={{
						span: 6,
					}}
					lg={{
						span: 24,
					}}
				>
					<div className="pie-chart">
						<Title style={{ marginTop: 15, color: "#666666", textAlign: "center", fontSize: 23 }}>
							{t(`attendanceOverview`)}
						</Title>
						<Doughnut style={{ marginTop: "15px" }} data={data} options={{}}></Doughnut>
					</div>
				</Col>
			</Row>
			<TaskGrid />
		</main>
	);
};

export default DashboardPage;
