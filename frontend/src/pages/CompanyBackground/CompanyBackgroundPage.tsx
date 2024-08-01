import React from "react";
import { Avatar, Button, Card, Col, Row, Steps, Typography } from "antd";
import "../CompanyBackground/style/CompanyBackground.css";
import { PiBuildingApartmentLight } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineBadge } from "react-icons/md";
import Meta from "antd/es/card/Meta";
import CEO from "../../assets/ceo.jpeg";

const cardStyle: React.CSSProperties = {
  width: "900px",
  margin: "auto",
  marginTop: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  height: "300px", // Adjust height as needed
};

const bigcardStyle: React.CSSProperties = {
  width: "1000px",
  margin: "auto",
  border: "2px solid #e6eeff",
  marginTop: "30px",
  marginBottom: "30px",
  backgroundColor: "white",
};

const { Title } = Typography;

const CompanyBackgroundPage: React.FC = () => {
  return (
    <Card style={bigcardStyle}>
      <Card style={cardStyle} bordered={false} className="about-us">
        <div className="about-us-inner">
          <Title style={{ color: "white", marginBottom: "0px" }} level={2}>
            About Us
          </Title>
          <p style={{ fontSize: "17px", fontWeight: "lighter" }}>
            <b>CodeVider</b> is a leading provider of cutting-edge technology
            solutions, dedicated to empowering businesses of all sizes. With a
            focus on innovation and customer success, we strive to transform the
            way organizations operate and thrive in the digital landscape.
          </p>
        </div>
      </Card>
      <Title style={{ marginLeft: "40px" }} level={3}>
        Our Journey
      </Title>
      <Steps
        direction="vertical"
        status="wait"
        items={[
          {
            title: "Company founded",
            description: "July 2020",
            icon: <PiBuildingApartmentLight />,
          },
          {
            title: "First customers",
            description: "Sep 2020",
            icon: <FaRegUser />,
          },
          {
            title: "Hired first employee",
            description: "Oct 2020",
            icon: <MdOutlineBadge />,
          },
        ]}
      />
      <Typography>
        <Title style={{ marginLeft: "40px" }} level={3}>
          Our Mission
        </Title>
        <p style={{ fontSize: "15px", marginLeft: "40px" }}>
          We believe that everyone should have the opportunity to work with a
          great team. That's why we're building a platform that helps companies
          find and hire the best talent, and helps job seekers find the right
          team for them. Our mission is to make it easier for everyone to build
          and join great teams, so that more people can do the work they love.
        </p>
      </Typography>
      <Title style={{ marginLeft: "40px" }} level={3}>
        Our Team
      </Title>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card bordered={false} style={{ width: "400px", marginLeft: "40px" }}>
            <Meta
              avatar={<Avatar className="aboutus-avatar" size={"large"} src={CEO} />}
              title="Pasho Toska"
              description="CEO"
            />
            {/* <Button>View Profile</Button> */}
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false} style={{ width: "400px", marginLeft: "40px" }}>
            <Meta
              avatar={<Avatar className="aboutus-avatar" size={"large"} src={""} />}
              title="Ervin Ziko"
              description="Finance Manager"
            />
            {/* <Button>View Profile</Button> */}
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card bordered={false} style={{ width: "400px", marginLeft: "40px" }}>
            <Meta
              avatar={<Avatar className="aboutus-avatar" size={"large"} src={""} />}
              title="Erion Domi"
              description="Multinational Manager"
            />
            {/* <Button>View Profile</Button> */}
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false} style={{ width: "400px", marginLeft: "40px" }}>
            <Meta
              avatar={<Avatar className="aboutus-avatar" size={"large"} src={""} />}
              title="Altin Luli"
              description="Outsorcing Manager"
            />
            {/* <Button>View Profile</Button> */}
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default CompanyBackgroundPage;
