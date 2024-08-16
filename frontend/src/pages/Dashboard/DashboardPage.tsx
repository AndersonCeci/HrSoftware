import { Row, Col, Typography } from "antd";
import { Doughnut } from "react-chartjs-2";
import WelcomeGrid from "./components/WelcomeGrid";
import CalendarGrid from "./components/CalendarGrid";
import TaskGrid from "./components/TaskGrid";
import "./styles/Dashboard.css";
import { t } from "i18next";
import EmployeeWelcomeGrid from "./components/EmployeeWelcomeGrid";
import { Content } from "antd/es/layout/layout";

export interface Data {
	noEmployee: number;
	status: string;
	color: string;
	path: string;
}

const DashboardPage: React.FC = () => {
  const initialData: Data[] = [
    {
      noEmployee: 300,
      status: t("activestatus"),
      color: "#136F63",
      path: "/managment/employment",
    },
    {
      noEmployee: 100,
      status: t("remoteEmployee"),
      color: "#474CCC",
      path: "/managment/employment",
    },
    {
      noEmployee: 50,
      status: t("dismissed"),
      color: "#CA054D",
      path: "/managment/dismissed",
    },
  ];

// const DELETED_API = import.meta.env.REACT_APP_DELETE_EMPLOYEE_API;
// const EMPLOYEE_API = import.meta.env.REACT_APP_EMPLOYEE_API;

  return (
    <Content
      className="site-layout-background"
      style={{
        margin: "24px 16px",
        padding: 10,
        minHeight: "750px",
        color: "grey",
      }}
    >
      {/* <Row gutter={[16, 16]} className="dashboard-main">
        <Col span={12}>
          <WelcomeGrid initialData={initialData} /> */}
          <EmployeeWelcomeGrid/>
        {/* </Col>
        <Col span={12}>
          <CalendarGrid />
        </Col>
      </Row>
      <TaskGrid /> */}
    </Content>
  );
};

export default DashboardPage;
