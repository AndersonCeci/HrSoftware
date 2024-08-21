import React from "react";
import { Avatar, Button, Card, Col, Flex, Row, Steps, Typography } from "antd";
import "../CompanyBackground/style/CompanyBackground.css";
import { PiBuildingApartmentLight } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineBadge } from "react-icons/md";
import Meta from "antd/es/card/Meta";
import CEO from "../../assets/ceo.jpeg";

const cardStyle: React.CSSProperties = {
  margin: "auto",
  marginTop: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  height: "300px", // Adjust height as needed
};

interface Data {
  title?: string;
  description?: string;
  avatar?: any;
}

const { Title } = Typography;

const CompanyBackgroundPage: React.FC = () => {
  const initialData: Data[] = [
    {
      title: "Pasho Toska",
      description: "CEO",
      avatar: <Avatar className="aboutus-avatar" size={"large"} src={CEO} />,
    },
    {
      title: "Ervin Ziko",
      description: "Finance Manager",
      avatar: <Avatar className="aboutus-avatar" size={"large"} src={""} />,
    },
    {
      title: "Erion Domi",
      description: "Multinational Manager",
      avatar: <Avatar className="aboutus-avatar" size={"large"} src={""} />,
    },
    {
      title: "Altin Luli",
      description: "Outsorcing Manager",
      avatar: <Avatar className="aboutus-avatar" size={"large"} src={""} />,
    },
  ];

  return (
    <Flex className="company-main-flex">
      <Card style={cardStyle} bordered={false} className="about-us">
        <div className="about-us-inner">
          <Title className="about-us-title" level={2}>
            About Us
          </Title>
          <p className="about-us-para">
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
        <Title className="mission-title" style={{ marginLeft: "40px" }} level={3}>
          Our Mission
        </Title>
        <p className="mission-para">
          We believe that everyone should have the opportunity to work with a
          great team. That's why we're building a platform that helps companies
          find and hire the best talent, and helps job seekers find the right
          team for them. Our mission is to make it easier for everyone to build
          and join great teams, so that more people can do the work they love.
        </p>
      </Typography>
      <Title style={{ marginLeft: "40px" }} level={3}>
        Boarding Managment
      </Title>
      <Flex className="ceo-cards">
        <Row gutter={[16, 16]}>
          {initialData.map((data) => {
            return (
              <Col
                span={12}
                xs={24}
                sm={24}
                md={12} 
                lg={12} 
                xl={12}
              >
                <Card
                  bordered={false}
                  style={{ width: "400px", marginLeft: "40px" }}
                >
                  <Meta
                    avatar={data?.avatar}
                    title={data?.title}
                    description={data?.description}
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      </Flex>
    </Flex>
  );
};

export default CompanyBackgroundPage;

// import axios from "axios";
// import { useState } from "react";

// interface RecruitmentWithFileDto {
//   name: string;
//   surname: string;
//   email: string;
//   position: string;
//   stage: string;
//   submittedDate: string;
//   cv?: string;
//   phoneNumber?: string | null;
//   isDeleted: boolean;
//   deleteDate?: string | null;
//   file?: {
//     filename: string;
//     data: string;
//   };
// }

// const CompanyBackgroundPage = () => {
//   const [recruitments, setRecruitments] = useState<RecruitmentWithFileDto[]>(
//     []
//   );
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchRecruitments = async (
//     subjectFilter?: string,
//     startDate?: string
//   ) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(
//         "http://localhost:3000/gmail-api/messages",
//         {
//           params: {
//             subjectFilter: subjectFilter || "Gerald",
//             startDate: startDate || "2024-08-01",
//           },
//         }
//       );
//       const data = response.data;
//       // console.log(response.data);
//       setRecruitments(data);
//     } catch (error) {
//       console.error("Error fetching recruitments:", error);
//       setError("Failed to fetch recruitments. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getBlobUrl = (base64url: string) => {
//     try {
//       if (!base64url) {
//         console.error("Empty base64url string provided");
//         return "";
//       }

//       console.log("Original base64url string:", base64url.substring(0, 50) + "...");

//       const base64 = base64url
//         .replace(/-/g, "+")
//         .replace(/_/g, "/")
//         .padEnd(base64url.length + ((4 - (base64url.length % 4)) % 4), "=");

//       console.log("Converted base64 string:", base64.substring(0, 50) + "...");

//       const binaryString = atob(base64);
//       const byteArray = new Uint8Array(binaryString.length);
//       for (let i = 0; i < binaryString.length; i++) {
//         byteArray[i] = binaryString.charCodeAt(i);
//       }

//       const blob = new Blob([byteArray], { type: "application/pdf" });
//       return URL.createObjectURL(blob);
//     } catch (error) {
//       console.error("Failed to create Blob URL:", error);
//       return "";
//     }
//   };

//   return (
//     <div>
//       <h1>Recruitments</h1>
//       <button onClick={() => fetchRecruitments()} disabled={loading}>
//         {loading ? "Loading..." : "Fetch Recruitments"}
//       </button>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <ul>
//         {recruitments.map((recruitment, index) => (
//           <li key={index}>
//             <h2>
//               {recruitment.name} {recruitment.surname}
//             </h2>
//             <p>Email: {recruitment.email}</p>
//             <p>Position: {recruitment.position}</p>
//             <p>Stage: {recruitment.stage}</p>
//             <p>
//               Submitted Date:{" "}
//               {new Date(recruitment.submittedDate).toLocaleString()}
//             </p>
//             {recruitment.file && recruitment.file.data ? (
//               <div>
//                 <p>File: {recruitment.file.filename}</p>
//                 <a
//                   href={getBlobUrl(recruitment.file.data)}
//                   download={recruitment.file.filename}
//                 >
//                   Download CV
//                 </a>
//                 <a
//                   href={getBlobUrl(recruitment.file.data)}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   style={{ marginLeft: "10px" }}
//                 >
//                   Preview CV
//                 </a>
//               </div>
//             ) : (
//               <p>No file available</p>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CompanyBackgroundPage;
