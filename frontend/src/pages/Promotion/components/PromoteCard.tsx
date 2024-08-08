import { Card, Col, ConfigProvider, Row } from "antd";
import { PromoteType } from "../types/PromoteType";
import { RightOutlined } from "@ant-design/icons";
import { EmployeeDataType } from "../../Employment/types/Employee";
import { useEffect, useState } from "react";
import useHttp from "../../../hooks/useHttp";
import Loader from "../../../components/Shared/Loader";
import moment from "moment";
import { useTranslation } from "react-i18next";

const API = import.meta.env.REACT_APP_EMPLOYEE_API;

type PromoteCardProps = {
  promote?: PromoteType;
};
const PromoteCard = ({ promote }: PromoteCardProps) => {
  const { t } = useTranslation();
  const [isLoading, error, sendRequest] = useHttp();
  const [tableData, setTableData] = useState<EmployeeDataType>();
  const EmployeData = JSON.parse(
    localStorage.getItem("userData") || "{}"
  ).employID;

  useEffect(() => {
    sendRequest(
      {
        url: `${API}/${EmployeData}`,
        headers: {
          "Content-Type": "application/json",
        },
      },
      setTableData
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
      }}
    >
      <Row gutter={12}>
        <ConfigProvider
          theme={{
            components: {
              Card: {
                borderRadius: 10,
              },
            },
          }}
        >
          <Col>
            <Card
              title={`${promote?.name} ${promote?.surname}`}
              style={{ width: "375px" }}
              styles={{
                header: { backgroundColor: "#3581B8", color: "white" },
                body: {
                  paddingTop: "0",
                  paddingBottom: "0",
                  display: "flex",
                  flexDirection: "column",
                },
              }}
              hoverable
            >
              <p>
                <b>{t("oldPosition")}:</b> {promote?.oldPosition}
              </p>
              <p>
                <b>{t("dateOfHire")}:</b> {tableData?.startingDate}
              </p>
              <p>
                <b>{t("salary")}:</b> {promote?.oldSalary}
              </p>
              <p>
                <b>{t("trainedBy")}:</b> {promote?.trainedBy}
              </p>
            </Card>
          </Col>
          <Col style={{ display: "flex" }}>
            <RightOutlined style={{ fontSize: "20px" }} />
          </Col>
          <Col>
            <Card
              title={`${tableData?.name} ${tableData?.surname}`}
              style={{ width: "370px" }}
              styles={{
                header: { backgroundColor: "#F4D03F", color: "white" },
                body: {
                  paddingTop: "0",
                  paddingBottom: "0",
                  display: "flex",
                  flexDirection: "column",
                },
              }}
              hoverable
            >
              <p>
                <b>{t("newPosition")}:</b> {promote?.newPosition}
              </p>
              <p>
                <b>{t("dateOfPromotion")}:</b> {moment(promote?.dateOfPromotion).format("DD/MM/YYYY")}
              </p>
              <p>
                <b>{t("salary")}:</b> {promote?.newSalary}
              </p>
              <p>
                <b>{t("trainedBy")}:</b> {promote?.trainedBy}
              </p>
            </Card>
          </Col>
        </ConfigProvider>
      </Row>
    </div>
  );
};

export default PromoteCard;
