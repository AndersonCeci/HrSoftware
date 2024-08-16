import { Doughnut } from "react-chartjs-2";
import { Data } from "../DashboardPage";
import "../../../styles/Dashboard/WelcomeGrid.css";
import { Row, Col, Typography, Button } from "antd";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { NavLink } from "react-router-dom";
import EmployeeCard from "./EmployeeCard";
import { useTranslation } from "react-i18next";
import Title from "antd/es/typography/Title";

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
        <div>
          {initialData.map((data) => {
            return (
              <Row gutter={[16, 48]} key={data.status}>
                <Col span={12} style={{ gap: "10px" }}>
                  <NavLink to={data.path}>
                    <Button
                      className="active-dashboard"
                      style={{ backgroundColor: data.color }}
                    >
                      <Title style={{ margin: 0, color: "white" }}>
                        {data.noEmployee}
                      </Title>
                      <Text style={{ fontSize: 20, color: "white" }}>
                        {data.status}
                      </Text>
                    </Button>
                  </NavLink>
                </Col>
              </Row>
            );
          })}
        </div>
        <div className="pie-chart">
          <Title
            style={{
              marginTop: 15,
              color: "#666666",
              textAlign: "center",
              fontSize: 23,
            }}
          >
            {t(`attendanceOverview`)}
          </Title>
          <Doughnut
            style={{ marginTop: "15px" }}
            data={data}
            options={options}
          ></Doughnut>
        </div>
      </div>
    </>
  );
};

export default WelcomeGrid;
