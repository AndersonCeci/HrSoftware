import { Card, ConfigProvider } from "antd";
import { PromoteType } from "../types/PromoteType";
import { useEffect, useState } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import Button from "../../../components/Shared/Button";
import ReactCardFlip from "react-card-flip";


type PromoteCardProps = {
  promote?: PromoteType;
};
const PromoteCard = ({ promote }: PromoteCardProps) => {
  const { t } = useTranslation();
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "No date provided";
    
    const formats = ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"];
    const date = moment(dateString, formats, true);
  
    return date.isValid() ? date.format("DD/MM/YYYY") : "Invalid date format";
  };
  

  return (
    <div
      style={{
        display: "flex",
        marginBottom: "20px",
        marginRight: "20px",
        width: "300px",
      }}
    >
      <ConfigProvider
        theme={{
          components: {
            Card: {
              borderRadius: 10,
            },
          },
        }}
      >
        <div style={{ width: "300px" }}>
          <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <div>
              <Card
                title={promote?.employeeName}
                style={{ width: "100%" }}
                styles={{
                  header: { backgroundColor: "#24A2FE", color: "white" },
                  body: {
                    paddingTop: "0",
                    paddingBottom: "0",
                    display: "flex",
                    flexDirection: "column",
                  },
                }}
                hoverable
              >
                <p style={{color:"black", margin:"5px"}}>
                  <b>{t("oldPosition")}:</b> {promote?.oldPosition}
                </p>
                <p style={{color:"black", margin:"5px"}}>
                  <b>{t("dateOfHire")}:</b> {promote?.dateOfHire}
                </p>
                <p style={{color:"black", margin:"5px"}}>
                  <b>{t("salary")}:</b> {promote?.oldSalary}
                </p>
                <p style={{color:"black", margin:"5px"}}>
                  <b>{t("trainedBy")}:</b> {promote?.trainedBy}
                </p>
                <Button
                  type="primary"
                  onClick={handleClick}
                  style={{ marginBottom: "10px" }}
                >
                  {t("viewNewPromotion")}
                </Button>
              </Card>
            </div>
            <div style={{ width: "300px" }}>
              <Card
                title={promote?.employeeName}
                style={{ width: "300px" }}
                styles={{
                  header: { backgroundColor: "#30D3CB", color: "white" },
                  body: {
                    paddingTop: "0",
                    paddingBottom: "0",
                    display: "flex",
                    flexDirection: "column",
                  },
                }}
                hoverable
              >
                <p style={{color:"black", margin:"5px"}}>
                  <b>{t("newPosition")}:</b> {promote?.newPosition}
                </p>
                <p style={{color:"black", margin:"5px"}}>
                  <b>{t("dateOfPromotion")}:</b>{" "}
                  {formatDate(promote?.dateOfPromotion)}
                </p>
                <p style={{color:"black", margin:"5px"}}>
                  <b>{t("salary")}:</b> {promote?.newSalary}
                </p>
                <p style={{color:"black", margin:"5px"}}>
                  <b>{t("trainedBy")}:</b> {promote?.trainedBy}
                </p>
                <Button
                  type="primary"
                  onClick={handleClick}
                  style={{ marginBottom: "10px" }}
                >
                  {t("viewOldPosition")}
                </Button>
              </Card>
            </div>
          </ReactCardFlip>
        </div>
      </ConfigProvider>
    </div>
  );
};

export default PromoteCard;
