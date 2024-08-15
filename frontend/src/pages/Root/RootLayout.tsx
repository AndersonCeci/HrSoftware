import { Outlet } from "react-router-dom";
import NavigationMenu from "../../components/Navigation/NavigationMenu";
import Header from "../../components/Header/Header";
import NavigationMenuLogo from "../../components/Navigation/NavigationMenuLogo";
import HeaderIcons from "../../components/Header/HeaderIcons";
import LogedUserPanel from "../../components/Navigation/LogedUserPanel";
import Trigger from "../../components/Navigation/Trigger";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { useNavigate } from "react-router-dom";
import { Layout } from "antd";
import "./Style/RootStyle.css";

const { Content, Sider } = Layout;

import { useState, useEffect } from "react";

const RootLayout: React.FC = () => {
  const [colapsed, setColapsed] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const token = localStorage.getItem("userData");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  // useEffect(() => {
  // 	const verifyToken = async (token: string) => {
  // 	  try {
  // 		const response = await fetch('http://localhost:3000/verify', {
  // 		  method: 'GET',
  // 		  headers: {
  // 			'Authorization': `Bearer ${token}`,
  // 		  },
  // 		});

  // 		if (!response.ok) {
  // 		  throw new Error('Token is invalid or expired');
  // 		}

  // 		const data = await response.json();
  // 		return data;
  // 	  } catch (error) {
  // 		console.error(error);
  // 		navigate('/');
  // 	  }
  // 	};

  // 	const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  // 	if (!userData.token) {
  // 	  navigate("/");
  // 	} else {
  // 	  verifyToken(userData.token);
  // 	}
  //   }, []);

  function onCollapse() {
    // console.log(collapsed);
    setColapsed((prev) => !prev);
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setColapsed(true);
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout className="root-page-container">
      <Header
        first={<NavigationMenuLogo logotext="HRSoftware" />}
        third={<HeaderIcons />}
      />
      <Content className="root-content-container">
        <Layout className="root-layout-container">
          <Sider
            collapsible
            collapsed={colapsed}
            onCollapse={onCollapse}
            width={300}
            collapsedWidth={90}
            className="sider-container"
            theme="light"
            trigger={!isMobile ? <Trigger colapsed={colapsed} /> : null}
          >
            {<LogedUserPanel colapsed={colapsed} />}
            <NavigationMenu colapsed={colapsed} />
          </Sider>
          <Content className="outlet-container">
            <FloatButton
              className="float-button "
              icon={<ExclamationCircleOutlined />}
              type="primary"
              style={{ right: 12, bottom: 12 }}
              onClick={() => navigate("/company-background")}
            />

            <Outlet />
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default RootLayout;
