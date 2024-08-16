import { Doughnut } from "react-chartjs-2";
import { Data } from "../DashboardPage";
import "../../../styles/Dashboard/WelcomeGrid.css";
import { Row, Col, Typography, Button } from "antd";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { NavLink } from "react-router-dom";
import EmployeeCard from "./EmployeeCard";
import { useTranslation } from "react-i18next";

ChartJS.register(ArcElement, Tooltip, Legend);



interface WelcomeGridProps {
	initialData: Data[];
}

export const WelcomeGrid: React.FC<WelcomeGridProps> = ({ initialData }) => {
	

	const options = {};

	const { t } = useTranslation();

	return (
		<>
			<div className="welcome-grid">
				<div className="employee-card-container">
					<Row gutter={48}>
						{initialData.map((data) => {
							return (
								<Col  span={8} >
									<EmployeeCard
										displayNr={data.noEmployee}
										displayTxt={data.status}
										onClickPath={data.path}
										status={data.color}
									/>
								</Col>
							);
						})}
					</Row>
				</div>
			</div>
		</>
	);
};

export default WelcomeGrid;
