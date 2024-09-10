import Button from "../Shared/Button";
import { Flex, Menu } from "antd";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Paths } from "../../utils/paths";
import "../../styles/Navigation/NavigationMenu.css";
import { LogoutOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LogedUserPanel from "./LogedUserPanel";
import { isHR } from "../../utils/utils";
import { getMenuItemsByRole, getMenuItemType } from "../../utils/NavMenuHelper";

const NavigationMenu = ({ colapsed }: { colapsed: boolean }) => {
	const [defaultSelectedKey, setDefaultSelectedKey] = useState(
		useLocation()
			.pathname.split("/")
			.filter((x) => x),
	);

	const location = useLocation();
	const navigate = useNavigate();
	const isHr = isHR();
	const navElements = [
		Paths.Dashboard,
		...(isHr ? [Paths.Recruitment] : []),
		...(isHr ? [Paths.Employee] : []),
		Paths.Management,
		Paths.DayOff,
		Paths.Company,
	];
	const { t } = useTranslation();

	const items: any = navElements.map((element) => {
		return {
			key: `${element.path}`,
			label: t(element.path),
			type: getMenuItemType(element, isHr),
			icon: element.icon ? <element.icon className="nav-menu-icon" /> : null,
			children: element.children.map((subElement) => {
				return getMenuItemsByRole(element, subElement, isHr);
			}),
		};
	});

	// const items = getNavMenuItems();

	useEffect(() => {
		setDefaultSelectedKey(location.pathname.split("/").filter((x) => x));
	}, [location.pathname]);

	const handleClick = () => {
		localStorage.removeItem("userData");
		navigate("/");
	};

	// console.log(defaultSelectedKey, "defaultSelectedKey");
	const [defaultSelect, defaultSubSelect] = defaultSelectedKey;
	// console.log(defaultSelect, defaultSubSelect, "defaultSelect, defaultSubSelect");

	return (
		<Flex
			vertical
			align="stretch"
			justify="stretch"
			style={{
				height: "100%",
				width: "100%",
				overflow: "scroll",
			}}
		>
			<div className="top-menu-elements">
				<LogedUserPanel colapsed={colapsed} />
				<Menu
					className="side-nevigation-menu"
					defaultSelectedKeys={[defaultSubSelect ? defaultSubSelect : defaultSelect]}
					defaultOpenKeys={[defaultSelect]}
					spellCheck={true}
					mode="inline"
					items={items}
				/>
			</div>

			<div className="logout-button-container">
				<Button type="text" danger size="large" onClick={handleClick}>
					<LogoutOutlined />
					{!colapsed ? t(`logOut`) : ""}
				</Button>
			</div>
		</Flex>
	);
};

export default NavigationMenu;
