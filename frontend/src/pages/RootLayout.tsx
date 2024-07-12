import { Outlet } from "react-router-dom";
import NavigationMenu from "../components/Navigation/NavigationMenu";
import Header from "../components/Header/Header";
import NavigationMenuLogo from "../components/Navigation/NavigationMenuLogo";
import HeaderIcons from "../components/Header/HeaderIcons";
import LogedUserPanel from "../components/Navigation/LogedUserPanel";
import Trigger from "../components/Navigation/Trigger";

import { Layout } from "antd";
const { Content, Sider } = Layout;

import { useState } from "react";

const RootLayout: React.FC = () => {
	const [colapsed, setColapsed] = useState<boolean>(false);

	function onCollapse(collapsed: boolean) {
		console.log(collapsed);
		setColapsed(!colapsed);
	}

	return (
		<Layout>
			<Header first={<NavigationMenuLogo />} third={<HeaderIcons />} />
			<Content>
				<Layout>
					<Sider
						collapsible
						collapsed={colapsed}
						onCollapse={onCollapse}
						width={300}
						collapsedWidth={90}
						style={{
							minHeight: "90vh",
							height: "100%",
						}}
						theme="light"
						trigger={<Trigger colapsed={colapsed}/>}
					>
						{!colapsed && <LogedUserPanel />}
						<NavigationMenu colapsed={colapsed} />
					</Sider>
					<Content>
						<Outlet />
					</Content>
				</Layout>
			</Content>
		</Layout>
	);
};

export default RootLayout;
