import { Avatar, Card, Col, Flex, Row } from "antd";
import Meta from "antd/es/card/Meta";
import "../Profile/style/ProfilePage.css";
import Button from "../../components/Shared/Button";
import { ButtonType } from "../../enums/Button";
import { useEffect, useState } from "react";
import EditProfile from "./components/EditProfile";
import { FaRegUser } from "react-icons/fa";
import { MdLocalPhone, MdOutlineBadge, MdOutlineEmail } from "react-icons/md";
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import { CalendarOutlined } from "@ant-design/icons";
import useHttp from "../../hooks/useHttp";
import { EmployeeDataType } from "../Employment/types/Employee";
import SettingsPage from "../Settings/SettingsPage";
import Loader from "../../components/Shared/Loader";

const API = import.meta.env.REACT_APP_USER_API;

const ProfilePage: React.FC = () => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, error, sendRequest] = useHttp();
  const [tableData, setTableData] = useState<EmployeeDataType[]>([]);

  useEffect(() => {
    sendRequest(
      {
        url: API,
        headers: {
          "Content-Type": "application/json",
        },
      }, 
      setTableData
    );
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (isLoading) {
    return <Loader/>
  }

  if (error) {
    return <div>Something went wrong!!</div>
  }


  return (
    <div>
      <Flex>
        <Flex vertical>
          <Card
            style={{ marginTop: "20px", alignItems: "center" }}
          >
            <Meta
              avatar={
                <Avatar
                  size={"large"}
                  src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                />
              }
              style={{ marginLeft: "10px" }}
              title={userData.username}
              description={userData.role.toUpperCase()}
            />
            <Button
              style={{ marginLeft: "75px", marginTop: "10px" }}
              type={ButtonType.PRIMARY}
              onClick={showModal}
            >
              Edit Profile
            </Button>
            <EditProfile
              visible={isModalVisible}
              handleOk={handleOk}
              handleCancel={handleCancel}
            />
          </Card>
          <Card
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "20px",
              marginBottom: "20px",
              width: "300px",
              height:"100%"
            }}
          >
            <Meta
              avatar={
                <Avatar
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "#e6eeff",
                  }}
                  icon={<FaRegUser style={{ color: "#246AFE" }} />}
                />
              }
              style={{
                marginLeft: "10px",
                alignItems: "center",
                marginBottom: "30px",
              }}
              title="Name"
              description={userData.name}
            />
            <Meta
              avatar={
                <Avatar
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "#e6eeff",
                  }}
                  icon={<MdOutlineBadge style={{ color: "#246AFE" }} />}
                />
              }
              style={{
                marginLeft: "10px",
                color: "wheat",
                alignItems: "center",
                marginBottom: "30px",
              }}
              title="Position"
              description={userData.role.toUpperCase()}
            />
            <Meta
              avatar={
                <Avatar
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "#e6eeff",
                  }}
                  icon={<RiMoneyEuroCircleLine style={{ color: "#246AFE" }} />}
                />
              }
              style={{
                marginLeft: "10px",
                color: "wheat",
                alignItems: "center",
                marginBottom: "30px",
              }}
              title="Salary"
              description={userData.role.toUpperCase()}
            />
            <Meta
              avatar={
                <Avatar
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "#e6eeff",
                  }}
                  icon={<CalendarOutlined style={{ color: "#246AFE" }} />}
                />
              }
              style={{
                marginLeft: "10px",
                color: "wheat",
                alignItems: "center",
                marginBottom: "30px",
              }}
              title="Start Date"
              description={userData.role.toUpperCase()}
            />
            <Meta
              avatar={
                <Avatar
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "#e6eeff",
                  }}
                  icon={<MdOutlineEmail style={{ color: "#246AFE" }} />}
                />
              }
              style={{
                marginLeft: "10px",
                color: "wheat",
                alignItems: "center",
                marginBottom: "30px",
              }}
              title="Email"
              description={userData.role.toUpperCase()}
            />
            <Meta
              avatar={
                <Avatar
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "#e6eeff",
                  }}
                  icon={<MdLocalPhone style={{ color: "#246AFE" }} />}
                />
              }
              style={{
                marginLeft: "10px",
                color: "white",
                alignItems: "center",
              }}
              title="Phone Number"
              description={userData.role.toUpperCase()}
            />
          </Card>
        </Flex>
        <Flex>
          <SettingsPage/>

        </Flex>
      </Flex>
    </div>
  );
};

export default ProfilePage;
