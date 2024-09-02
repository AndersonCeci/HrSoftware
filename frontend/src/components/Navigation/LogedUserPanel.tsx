import { Avatar, Card, Flex } from "antd";
import "../../styles/Navigation/LogedUserPanel.css";
import { Link } from "react-router-dom";
import { getFromLocalStorage } from "../../utils/utils";
import useHttp from "../../hooks/useHttp";
import { useEffect, useState } from "react";
import { EmployeeDataType } from "../../pages/Employment/types/Employee";

const { Meta } = Card;

type LogedUserPanelProps = {
  colapsed: boolean;
};
const userData = getFromLocalStorage("userData");

const LogedUserPanel = ({ colapsed }: LogedUserPanelProps) => {

  const [employData, setEmployData] = useState<EmployeeDataType>();
  const [, , fetchData] = useHttp();

  useEffect(() => {
    fetchData(
      {
        url: `http://localhost:3000/employees/${userData.employID}`,
      },

      setEmployData
    );
  }, []);


  return (
    <>
      <Link to={"/profile"}>
        {!colapsed ? (
          <Card className="loged-user-card">
            <Meta
              avatar={<Avatar size={"large"} src={employData?.profilePhoto} />}
              title={userData.username}
              description={userData.role}
              className="loged-user-panel"
            />
          </Card>
        ) : (
          <Flex className="colapsed-avatar-container" justify="center">
            <Avatar size={"large"} src={employData?.profilePhoto} />
          </Flex>
        )}
      </Link>
    </>
  );
};

export default LogedUserPanel;
