import { Avatar, Card, Flex } from "antd";
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
import { useTranslation } from "react-i18next";

const API = import.meta.env.REACT_APP_EMPLOYEE_API;

interface Data {
  title: string;
  description?: any;
  icon?: any;
}

const ProfilePage: React.FC = () => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const EmployeData = JSON.parse(
    localStorage.getItem("userData") || "{}"
  ).employID;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, error, sendRequest] = useHttp();
  const [tableData, setTableData] = useState<EmployeeDataType>();
  const { t } = useTranslation();

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
    return <Loader />;
  }

  if (error) {
    return <div>Something went wrong!!</div>;
  }

  const initialData: Data[] = [
    {
      title: t("name"),
      description: tableData?.name || undefined,
      icon: <FaRegUser style={{ color: "#246AFE" }} />,
    },
    {
      title: t("position"),
      description: tableData?.position || undefined,
      icon: <MdOutlineBadge style={{ color: "#246AFE" }} />,
    },
    {
      title: t("salary"),
      description: tableData?.salary || undefined,
      icon: <RiMoneyEuroCircleLine style={{ color: "#246AFE" }} />,
    },
    {
      title: t("startingOn"),
      description: tableData?.startingDate || undefined,
      icon: <CalendarOutlined style={{ color: "#246AFE" }} />,
    },
    {
      title: t("Email"),
      description: tableData?.email || undefined,
      icon: <MdOutlineEmail style={{ color: "#246AFE" }} />,
    },
    {
      title: t("phoneNumber"),
      description: tableData?.phoneNumber || undefined,
      icon: <MdLocalPhone style={{ color: "#246AFE" }} />,
    },
  ];

  return (
    <div>
      <Flex className="main-flex-profile">
        <Flex vertical>
          <Card className="avatar-profile-card">
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
              className="edit-button"
              type={ButtonType.PRIMARY}
              onClick={showModal}
            >
              {t("editProfile")}
            </Button>
            <EditProfile
              visible={isModalVisible}
              handleOk={handleOk}
              handleCancel={handleCancel}
              currentData={tableData}
            />
          </Card>
          <Card className="personal-info-card">
            {initialData.map((data) => {
              return (
                <Meta
                  avatar={
                    <Avatar
                      className="avatar-personal-info"
                      icon={data?.icon}
                    />
                  }
                  className="meta-personal-info"
                  title={data?.title}
                  description={data?.description}
                />
              );
            })}
          </Card>
        </Flex>
        <Flex>
          <SettingsPage />
        </Flex>
      </Flex>
    </div>
  );
};

export default ProfilePage;
