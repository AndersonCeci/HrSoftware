import { Outlet } from "react-router-dom";
import NavigationMenu from "../../components/Navigation/NavigationMenu";
import Header from "../../components/Header/Header";
import NavigationMenuLogo from "../../components/Navigation/NavigationMenuLogo";
import HeaderIcons from "../../components/Header/HeaderIcons";
import Trigger from "../../components/Navigation/Trigger";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Flex, FloatButton } from "antd";
import { useNavigate } from "react-router-dom";
import { Layout } from "antd";
import "./Style/RootStyle.css";
import { getFromLocalStorage } from "../../utils/utils";

const { Content, Sider } = Layout;

import { useState, useEffect } from "react";

const RootLayout: React.FC = () => {
	const [colapsed, setColapsed] = useState<boolean>(false);
	const [isMobile, setIsMobile] = useState<boolean>(false);
	const token = getFromLocalStorage("userData");
	const navigate = useNavigate();

	useEffect(() => {
		// console.log("Token is null");
		if (token === null) {
			navigate("/");
		}
	}, []);

	function onCollapse() {
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
		<Layout>
			<Flex vertical flex={1} className="root-page-container">
				<Header first={<NavigationMenuLogo logotext="HRSoftware" />} third={<HeaderIcons />} />
				<Flex
					style={{
						height: "100%",
						overflow: "hidden",
					}}
				>
					<Sider
						collapsible
						collapsed={colapsed}
						onCollapse={onCollapse}
						collapsedWidth={90}
						className="sidebar-menu"
						width={300}
						theme={"light"}
						trigger={!isMobile ? <Trigger colapsed={colapsed} /> : null}
					>
						{/* {<LogedUserPanel colapsed={colapsed} />} */}
						<NavigationMenu colapsed={colapsed} />
					</Sider>

					<Content className="content-outlet-container">
						<FloatButton
							className="float-button "
							icon={<ExclamationCircleOutlined />}
							type="primary"
							style={{
								right: 25,
								bottom: 12,
								boxShadow: "3.9px 7.8px 7.8px hsl(0deg 0% 0% / 0.38)",
							}}
							onClick={() => navigate("/company-background")}
						/>

						<Outlet />
					</Content>
				</Flex>
			</Flex>
		</Layout>
	);
};

export default RootLayout;

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
