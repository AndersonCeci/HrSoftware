import "./styles/Dashboard.css";
import { t } from "i18next";
import EmployeeWelcomeGrid from "./components/EmployeeWelcomeGrid";
import { Content } from "antd/es/layout/layout";
import HRWelcomeGrid from "./components/HRWelcomeGrid";

export interface Data {
  noEmployee: number;
  status: string;
  color: string;
  path: string;
}

const DashboardPage: React.FC = () => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  const initialData: Data[] = [
    {
      noEmployee: 300,
      status: t("activestatus"),
      color: "#136F63",
      path: "/employment",
    },
    {
      noEmployee: 100,
      status: t("remoteEmployee"),
      color: "#474CCC",
      path: "employment",
    },
    {
      noEmployee: 50,
      status: t("dismissed"),
      color: "#CA054D",
      path: "/managment/dismissed",
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
      {userData.role === "employee" ? (
        <EmployeeWelcomeGrid />
      ) : (
        <HRWelcomeGrid initialData={initialData} />
      )}
    </Content>
  );
};

export default DashboardPage;
