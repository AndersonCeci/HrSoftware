import { Card, Col, Flex, Row } from "antd";
import Title from "antd/es/typography/Title";
import "../styles/EmployeeWelcomeGrid.css";
import { EmployeeDataType } from "../../Employment/types/Employee";
import { useEffect, useState } from "react";
import useHttp from "../../../hooks/useHttp";
import Loader from "../../../components/Shared/Loader";
import Promotions from "../../../assets/promotions.png";
import CalendarGrid from "./CalendarGrid";
import TaskGrid from "./TaskGrid";
import EmployeeLineGraph from "./EmployeeLineGraph";
import { useTranslation } from "react-i18next";
import JokeCard from "./JokeCard";
import { PromoteType } from "../../Promotion/types/PromoteType";

interface Item {
  title: string;
  content?: any;
  color: string;
  status: string;
}

interface Data {
  paragraph: string;
  days?: any;
}

const EmployeeWelcomeGrid: React.FC = () => {
  const [isLoading, error, sendRequest] = useHttp();
  const { t } = useTranslation();
  const [tableData, setTableData] = useState<EmployeeDataType>();
  const EmployeData = JSON.parse(
    localStorage.getItem("userData") || "{}"
  ).employID;

  const initialItem: Item[] = [
    {
      title: t("projectManager"),
      content: tableData?.teamLeader || undefined,
      color: "#474CCC",
      status: "pr",
    },
    {
      title: t("holidayEntitlement"),
      content: tableData?.teamLeader || undefined,
      color: "#CA054D",
      status: "holiday",
    },
    {
      title: t("currentSalary"),
      content: tableData?.salary || undefined,
      color: "#136F63",
      status: "pr",
    },
  ];

  const holidayData: Data[] = [
    {
      paragraph: "Total",
      days: "",
    },
    {
      paragraph: "Taken",
      days: "",
    },
    {
      paragraph: "Remaining",
      days: "",
    },
  ];

  useEffect(() => {
    sendRequest(
      {
        endpoint: `employees/${EmployeData}`,
      },
      (data: EmployeeDataType) => {
        setTableData(data);
      }
    );
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Something went wrong!!</div>;
  }

  return (
    <>
      <Flex className="flex-main" justify="space-around" gap={20}>
        <div>
          <Flex justify="space-between">
            {initialItem.map((item, index) => {
              return (
                <Col key={index} className="employee-card">
                  <Card
                    className="card-employee"
                    style={{ backgroundColor: item.color }}
                  >
                    <h2 className="card-title">{item.title}</h2>
                    {item.status === "holiday" ? (
                      <Flex className="holiday-card">
                        {holidayData.map((data, index) => {
                          return (
                            <div key={index}>
                              <p style={{ color: "white" }}>{data.paragraph}</p>
                              <br />
                              <p style={{ color: "white" }}>{data.days}</p>
                            </div>
                          );
                        })}
                      </Flex>
                    ) : (
                      <h1
                        style={{
                          color: "white",
                        }}
                        className="card-text"
                      >
                        {item.content}
                      </h1>
                    )}
                  </Card>
                </Col>
              );
            })}
          </Flex>
          <Row style={{ justifyContent: "space-between", marginTop: "20px" }}>
            <Col>
              <Card className="card-promotions">
                <h2 className="promo-title">{t("promotions")}</h2>
                <img className="promo-img" src={Promotions} />
              </Card>
            </Col>
            <Col className="bonus-graph">
              <EmployeeLineGraph />
            </Col>
          </Row>
          <TaskGrid />
        </div>
        <Flex align="flex-start">
          <Row className="qoute-row">
            <Col>
              <JokeCard />
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

export default EmployeeWelcomeGrid;
