import { Card, Col, Flex, Row } from "antd";
import Title from "antd/es/typography/Title";
import "../components/style/EmployeeWelcomeGrid.css";
import { EmployeeDataType } from "../../Employment/types/Employee";
import { useEffect, useState } from "react";
import useHttp from "../../../hooks/useHttp";
import Loader from "../../../components/Shared/Loader";
import Qoute from "../../../assets/qoute.png";
import Promotions from "../../../assets/promotions.png";
import CalendarGrid from "./CalendarGrid";
import TaskGrid from "./TaskGrid";
import EmployeeLineGraph from "./EmployeeLineGraph";
import { useTranslation } from "react-i18next";

const API = import.meta.env.REACT_APP_EMPLOYEE_API;

const EmployeeWelcomeGrid: React.FC = () => {
  const [isLoading, error, sendRequest] = useHttp();
  const { t } = useTranslation();
  const [quote, setQuote] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [tableData, setTableData] = useState<EmployeeDataType | undefined>(
    undefined,
  );
  const EmployeData = JSON.parse(
    localStorage.getItem("userData") || "{}",
  ).employID;

  useEffect(() => {
    sendRequest(
      {
        url: `http://localhost:3000/employees/${EmployeData}`,
      },
      (data: EmployeeDataType) => {
        setTableData(data);
      },
    );

    const fetchQuote = async () => {
      try {
        const response = await fetch("/api/today");

        const data = await response.json();

        if (data && data.length > 0) {
          setQuote(data[0].q);
          setAuthor(data[0].a);
        }
      } catch (error) {
        console.error("Error fetching the quote:", error);
      }
    };
    fetchQuote();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Something went wrong!!</div>;
  }
  return (
    <>
      <Flex className="flex-main" justify="space-between">
        <div>
          <Row gutter={[16, 8]} className="employee-row-card">
            {tableData?.teamLeader && (
              <Col className="employee-col-card">
                <Card
                  className="card-employee"
                  style={{ backgroundColor: "#474CCC" }}
                >
                  <h2 className="card-title">{t("projectManager")}</h2>
                  <Title className="card-text">{tableData?.teamLeader}</Title>
                </Card>
              </Col>
            )}
            <Col>
              <Card
                className="card-employee"
                style={{ backgroundColor: "#CA054D" }}
              >
                <h2 className="card-title">{t("holidayEntitlement")}</h2>
                <Flex className="holiday-card">
                  <p>
                    Total
                    <br />
                    10
                  </p>
                  <p>
                    Taken
                    <br />5
                  </p>
                  <p>
                    Remaining
                    <br />5
                  </p>
                </Flex>
              </Card>
            </Col>
            <Col>
              <Card
                className="card-employee"
                style={{ backgroundColor: "#136F63" }}
              >
                <h2 className="card-title">{t("currentSalary")}</h2>
                <Title className="card-text">€{tableData?.salary}</Title>
              </Card>
            </Col>
          </Row>
          <Row style={{ justifyContent: "space-between" }}>
            <Col>
              <Card className="card-promotions" style={{ marginTop: "20px" }}>
                <h2 style={{ marginTop: "0" }}>{"promotions"}</h2>
                <img
                  style={{ width: "168px", height: "168px" }}
                  src={Promotions}
                />
                {/* <li className="promotion-list"></li> */}
              </Card>
            </Col>
            <Col
              style={{
                width: "65%",
                justifyContent: "space-between",
                height: "",
                marginTop: "20px",
                marginLeft: "20px",
              }}
            >
              <EmployeeLineGraph />
            </Col>
          </Row>
          <TaskGrid />
        </div>

        <Flex align="flex-start">
          <Row style={{ width: "425px" }}>
            <Col>
              <Card
                className="card-quote"
                styles={{ body: { height: "auto" } }}
              >
                <Flex style={{ display: "flex", alignItems: "center" }}>
                  <div>
                    <h2 style={{}}>{t("dailyQuote")}</h2>
                    <p style={{ fontWeight: "lighter", fontSize: "17px" }}>
                      "{quote}"
                    </p>
                    <p style={{ fontWeight: "lighter", float: "right" }}>
                      - {author}
                    </p>
                  </div>
                  <div>
                    <img
                      style={{ width: "178px", height: "184px" }}
                      src={Qoute}
                    />
                  </div>
                </Flex>
              </Card>
            </Col>
            <Col style={{ marginBottom: "1rem" }}>
              <CalendarGrid />
            </Col>
          </Row>
        </Flex>
      </Flex>
    </>
  );
};

export default EmployeeWelcomeGrid;
