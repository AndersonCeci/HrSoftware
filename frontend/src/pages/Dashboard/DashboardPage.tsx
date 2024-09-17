import "./styles/Dashboard.css";
import { t } from "i18next";
import EmployeeWelcomeGrid from "./components/EmployeeWelcomeGrid";
import { Content } from "antd/es/layout/layout";
import HRWelcomeGrid from "./components/HRWelcomeGrid";
import useHttp from "../../hooks/useHttp";
import { useEffect, useState } from "react";
import { LeftDataType } from "../Dismissed/types/Left";

export interface Data {
  noEmployee: number;
  status: string;
  color: string;
  path: string;
}

type EmployeStatus = {
  count: number;
  status: string;
};
const DISSMISED = import.meta.env.REACT_APP_DELETE_EMPLOYEE_API;

const DashboardPage: React.FC = () => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const [employeeTableData, setEmployeeTableData] = useState<EmployeStatus[]>(
    []
  );
  const [dismissedTableData, setDismissedTableData] = useState<LeftDataType[]>(
    []
  );
  const [, , sendRequest] = useHttp();

  useEffect(() => {
    sendRequest(
      {
        endpoint: "employees/status-length",
      },
      (responseData: EmployeStatus[]) => {
        setEmployeeTableData(responseData);
      }
    );
  }, []);

  useEffect(() => {
    sendRequest(
      {
        endpoint: DISSMISED,
        headers: {
          "Content-Type": "application/json",
        },
      },
      setDismissedTableData
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let remote = 0;
  let onSite = 0;

  employeeTableData.forEach((item: EmployeStatus) => {
    if (item.status === "Remote") {
      remote = item.count;
    } else if (item.status === "On Site") {
      onSite = item.count;
    }
  });

  const countDismissedEmployees = dismissedTableData.total || 0;

  const initialData: Data[] = [
    {
      noEmployee: onSite,
      status: t("onSiteEmployees"),
      color: "#136F63",
      path: "/employment",
    },
    {
      noEmployee: remote,
      status: t("remoteEmployees"),
      color: "#474CCC",
      path: `/employment`,
    },
    {
      noEmployee: countDismissedEmployees,
      status: t("dismissedEmployees"),
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
