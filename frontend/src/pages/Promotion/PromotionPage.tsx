import { Card, Col, ConfigProvider, Row, Tag, Typography } from "antd";
import { useTranslation } from "react-i18next";
import Arrow from "../../assets/right-arrow.gif";

const { Title } = Typography;

const PromotionPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Typography.Title level={3}>{t("promotions")}</Typography.Title>
      <Row gutter={[8, 16]}>
        <ConfigProvider
          theme={{
            components: {
              Card: {
                borderRadius: 10,
              },
            },
          }}
        >
          <Col span={8}>
            <Card
              title="Jane Doe"
              styles={{
                header: { backgroundColor: "#33cccc", color: "white" },
                body: { paddingTop: "0", paddingBottom: "0" },
              }}
              hoverable
            >
                <Tag color="#FFA500" style={{marginTop:"20px"}}>{t("promoted")}</Tag>
              <p>Position: Senior FrontEnd</p>
              <p>Date: 20/05/2020</p>
              <p>Salary: 1000</p>
              <p>Trainee: John Wick</p>
            </Card>
          </Col>
          <Col
            span={8}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "50px",
            }}
          >
          </Col>
        </ConfigProvider>
      </Row>
    </div>
  );
};

export default PromotionPage;
