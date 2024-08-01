import { Avatar, Card, Skeleton } from "antd";

import { useState, useEffect } from "react";

import "../../styles/Navigation/LogedUserPanel.css";
import { Link, useNavigate } from "react-router-dom";

const { Meta } = Card;

const LogedUserPanel = () => {
  const [loading, setLoading] = useState(true);
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  console.log(userData);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  const username = JSON.parse(
    localStorage.getItem("userData") || "{}"
  ).username;

  // const navigate = useNavigate();

  // const handleClick = () => {
  //   localStorage.removeItem("userData");
  //   console.log("Cleared?", localStorage.getItem("token"));
  //   navigate("/frontend/src/pages/ProfilePage.tsx");
  // };
  return (
    <>
      <Link to={"/profile"}>
        <Card className="loged-user-card">
          <Skeleton loading={false} avatar active>
            <Meta
              avatar={
                <Avatar
                  size={"large"}
                  src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                />
              }
              title={userData.username}
              description={userData.role.toUpperCase()}
              className="loged-user-panel"
            />
          </Skeleton>
        </Card>
      </Link>
    </>
  );
};

export default LogedUserPanel;
