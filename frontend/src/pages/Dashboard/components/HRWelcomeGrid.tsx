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
import { LeftDataType, RemainingDays } from "../../Dismissed/types/Left";
import { useEffect, useState } from "react";
import useHttp from "../../../hooks/useHttp";
import { getFromLocalStorage } from "../../../utils/utils";

ChartJS.register(ArcElement, Tooltip, Legend);

interface WelcomeGridProps {
  initialData: Data[];
}

export const WelcomeGrid: React.FC<WelcomeGridProps> = ({ initialData }) => {
  const options = {};
  const { t } = useTranslation();
  const [tableData, setTableData] = useState<LeftDataType[]>([]);
  const RemainingDays = import.meta.env.REACT_APP_REMAINING_DAYS_OFF;

  const [remainingDays, setRemainingDays] = useState<RemainingDays>();
  const { employID } = getFromLocalStorage("userData");
  const [, , sendRequest] = useHttp();

  useEffect(() => {
    sendRequest(
      {
        endpoint: `left`,
        headers: {
          "Content-Type": "application/json",
        },
      },
      (response) => {
        setTableData(response.data);
      }
    );
  }, []);

  useEffect(() => {
    sendRequest(
      {
        endpoint: `${RemainingDays}/${employID}`,
        headers: {
          "Content-Type": "application/json",
        },
      },

      setRemainingDays
    );
  }, []);

  const onDays = remainingDays?.remainingDays;

  const data = {
    labels: ["Off", "On"],
    datasets: [
      {
        label: "Days",
        data: [25 - onDays, onDays],
        backgroundColor: ["#FFBC42", "#73D2DE"],
      },
    ],
  };

  return (
    <>
      <Flex className="welcome-grid" justify="space-around" gap={20}>
        <div>
          <Flex justify="space-between">
            {initialData.map((data, index) => {
              return (
                <Col key={index} className="hr-buttons">
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
              <Card
                className="pie-chart"
                style={{
                  boxShadow: "3.9px 7.8px 7.8px hsla(0, 0%, 69%, 0.407)",
                }}
              >
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
              <Card
                style={{
                  boxShadow: "3.9px 7.8px 7.8px hsla(0, 0%, 69%, 0.407)",
                  height: "330px",
                }}
              >
                <HrLineGraph />
              </Card>
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
