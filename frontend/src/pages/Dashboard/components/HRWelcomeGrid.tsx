import { Doughnut } from "react-chartjs-2";
import { Data } from "../DashboardPage";
import "../styles/HRWelcomeGrid.css";
import { Col, Button, Flex, Row, Card } from "antd";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Title from "antd/es/typography/Title";
import TaskGrid from "./TaskGrid";
import QouteCard from "./QouteCard";
import CalendarGrid from "./CalendarGrid";
import HrLineGraph from "./HrLineGraph";

ChartJS.register(ArcElement, Tooltip, Legend);

interface WelcomeGridProps {
  initialData: Data[];
}

export const WelcomeGrid: React.FC<WelcomeGridProps> = ({ initialData }) => {
  const options = {};
  const { t } = useTranslation();

  const data = {
    labels: ["Off", "on"],
    datasets: [
      {
        label: "Days",
        data: [3, 6],
        backgroundColor: ["#FFBC42", "#73D2DE"],
      },
    ],
  };

  return (
    <>
      <Flex className="welcome-grid" justify="space-around">
        <div>
          <Flex justify="space-between">
            {initialData.map((data) => {
              return (
                <Col className="hr-buttons">
                  <NavLink to={data.path}>
                    <Button
                      className="active-dashboard"
                      style={{ backgroundColor: data.color, padding: "20px" }}
                    >
                      <Title className="hr-card-title">
                        {data?.noEmployee}
                      </Title>
                      <h1 className="hr-card-status">{data.status}</h1>
                    </Button>
                  </NavLink>
                </Col>
              );
            })}
          </Flex>
          <Row
            className="graph-row"
            style={{ justifyContent: "space-between" }}
          >
            <Col>
              <Card className="pie-chart">
                <Title className="title-piechart">
                  {t(`attendanceOverview`)}
                </Title>
                <Doughnut
                  style={{ marginTop: "15px" }}
                  data={data}
                  options={options}
                ></Doughnut>
              </Card>
            </Col>
            <Col className="bonus-graph">
              <HrLineGraph />
            </Col>
          </Row>
          <TaskGrid />
        </div>
        <Flex align="flex-start">
          <Row className="qoute-row">
            <Col>
              <QouteCard />
            </Col>
            <Col className="calendar-col">
              <CalendarGrid />
            </Col>
          </Row>
        </Flex>
      </Flex>
    </>
  );
};

export default WelcomeGrid;
