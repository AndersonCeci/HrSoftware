import React from "react";
import { Row, Col } from "antd";
import { Content } from "antd/es/layout/layout";
import WelcomeGrid from "../components/Dashboard/WelcomeGrid";
import CalendarGrid from "../components/Dashboard/CalendarGrid";
import TaskGrid from "../components/Dashboard/TaskGrid";
import { t } from "i18next";

export interface Data {
  noEmployee: number;
  status: string;
  color: string;
  path: string;
}



 
const DashboardPage: React.FC = () =>
{
   const initialData: Data[] = [
     {
       noEmployee: 300,
       status: t("activestatus"),
       color: "#ccffcc",
       path: "/management/employment",
     },
     {
       noEmployee: 100,
       status: t("remoteEmployee"),
       color: "#F0E6FA",
       path: "/management/employment",
     },
     {
       noEmployee: 50,
       status: t("dismissedEmployee"),
       color: "#ceebfd",
       path: "/management/dismissed",
     },
  ];
  
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
