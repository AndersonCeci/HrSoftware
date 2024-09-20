import { Avatar, Card, Flex } from "antd";
import "../../styles/Navigation/LogedUserPanel.css";
import { Link } from "react-router-dom";
import { getFromLocalStorage, stringToHashCodeHelper } from "../../utils/utils";
import useHttp from "../../hooks/useHttp";
import { useEffect, useState } from "react";
import { EmployeeDataType } from "../../pages/Employment/types/Employee";

const { Meta } = Card;

type LogedUserPanelProps = {
  colapsed: boolean;
};

const API = import.meta.env.REACT_APP_EMPLOYEE_API;

const LogedUserPanel = ({ colapsed }: LogedUserPanelProps) => {
  const userData = getFromLocalStorage();
  const color = stringToHashCodeHelper(userData?.employID);
  const [employData, setEmployData] = useState<EmployeeDataType>();
  const hasProfilePicture = !!employData?.profilePhoto;
  const [, , fetchData] = useHttp();

  useEffect(() => {
    fetchData(
      {
        endpoint: `${API}/${userData?.employID}`,
      },
      setEmployData
    );
  }, []);

  function renderAvatar() {
    if (hasProfilePicture) {
      return <Avatar size={"large"} src={employData?.profilePhoto} />;
    } else {
      return (
        <Avatar
          size={"large"}
          style={{
            backgroundColor: color,
            color: "black",
            fontSize: "1.5rem",
          }}
        >
          {userData?.username[0]}
        </Avatar>
      );
    }
  }

  return (
    <>
      <Link to={"/profile"}>
        {!colapsed ? (
          <Card className="loged-user-card">
            <Meta
              avatar={renderAvatar()}
              title={userData?.username}
              description={userData?.role.toUpperCase()}
              className="loged-user-panel"
            />
          </Card>
        ) : (
          <Flex className="colapsed-avatar-container" justify="center">
            {renderAvatar()}
          </Flex>
        )}
      </Link>
    </>
  );
};

export default LogedUserPanel;
