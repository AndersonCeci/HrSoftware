import { Avatar, Card, Flex, Image } from "antd";
import Meta from "antd/es/card/Meta";
import "../Profile/style/ProfilePage.css";
import Button from "../../components/Shared/Button";
import { ButtonType } from "../../enums/Button";
import { useEffect, useState } from "react";
import EditProfile from "./components/EditProfile";
import { FaRegUser } from "react-icons/fa";
import { MdLocalPhone, MdOutlineBadge, MdOutlineEmail } from "react-icons/md";
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import { CalendarOutlined, UserOutlined } from "@ant-design/icons";
import useHttp from "../../hooks/useHttp";
import { EmployeeDataType } from "../Employment/types/Employee";
import SettingsPage from "../Settings/SettingsPage";
import Loader from "../../components/Shared/Loader";
import { useTranslation } from "react-i18next";
import Title from "antd/es/typography/Title";

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
  const [isLoading, , sendRequest] = useHttp();
  const [tableData, setTableData] = useState<EmployeeDataType>();
  const { t } = useTranslation();
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  useEffect(() => {
    sendRequest(
      {
        endpoint: `${API}/${EmployeData}`,
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

  const handleImageUpload = (url: string) => {
    setAvatarUrl(url);
  };

  if (isLoading) {
    return <Loader />;
  }

  console.log(avatarUrl, "urlsetdryf7tr5ftl");

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
            <div className="inside-profile-card">
              <div>
                <img
                  className="profile-pic"
                  src={
                    tableData?.profilePhoto ||
                    "https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                  }
                />
              </div>
              <div>
                <h3>{userData.username}</h3>
                <p>{userData.role.toUpperCase()}</p>
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
                  setIsModal={handleOk}
                  handleCancel={handleCancel}
                  currentData={tableData}
                  onImageUpload={handleImageUpload}
                  setTableData={setTableData}
                />
              </div>
            </div>
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
