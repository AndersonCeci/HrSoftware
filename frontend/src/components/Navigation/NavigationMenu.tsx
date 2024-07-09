import {
	AppstoreOutlined,
	CalendarOutlined,
	BookOutlined,
	BellOutlined,
	ApartmentOutlined,
} from "@ant-design/icons";

import { MdOutlineEventAvailable } from "react-icons/md";
import { RiComputerLine } from "react-icons/ri";
import { TbPigMoney } from "react-icons/tb";
import { FaUmbrellaBeach } from "react-icons/fa";
import { GiDesk } from "react-icons/gi";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { TbUserCancel } from "react-icons/tb";
import { MdOutlinePersonSearch } from "react-icons/md";

import type { MenuProps } from "antd";
import { Menu, Badge } from "antd";
import { NavLink } from "react-router-dom";

import NavigationMenuLogo from "./NavigationMenuLogo";
import LogedUserPanel from "./LogedUserPanel";

import "../../styles/Navigation/NavigationMenu.css";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
	{
		key: "You",
		label: "You",
		// type: "group",
		children: [
			{
				key: "Dashboard",
				label: <NavLink to={"/dashboard"}>Dashboard</NavLink>,
				icon: <AppstoreOutlined className="nav-menu-icon" />,
			},
			{
				key: "Personal Calendar",
				label: <NavLink to={"/personal-calendar"}>Personal Calendar</NavLink>,
				icon: <CalendarOutlined className="nav-menu-icon" />,
			},
		],
	},
	{
		key: "Company",
		label: "Company",
		// type: "group",
		children: [
			{
				key: "Company Background",
				label: <NavLink to={"/company-background"}>Company Background</NavLink>,
				icon: <BookOutlined className="nav-menu-icon" />,
			},
			{
				key: "Notifications",
				label: <NavLink to={"/notifications"}>Notifications</NavLink>,
				icon: (
					<Badge count={10} size="small" >
						<BellOutlined className="nav-menu-icon" />
					</Badge>
				),
			},
			{
				key: "Events",
				label: <NavLink to={"/events"}>Events</NavLink>,
				icon: <MdOutlineEventAvailable className="nav-menu-icon" />,
			},
			{
				key: "Assets",
				label: <NavLink to={"/assets"}>Assets</NavLink>,
				icon: <RiComputerLine className="nav-menu-icon" />,
			},
			{
				key: "Organisational Structure",
				label: <NavLink to={"/organisational-structure"}>Organisational Structure</NavLink>,
				icon: <ApartmentOutlined className="nav-menu-icon" />,
			},
		],
	},
	{
		key: "Employee",
		label: "Employee",
		// type: "group",
		children: [
			{
				key: "Salary",
				label: <NavLink to={"/salaries"}>Salary</NavLink>,
				icon: <TbPigMoney className="nav-menu-icon" />,
			},
			true
				? {
						key: "Days Off",
						label: <NavLink to={"/day-off"}>Day Off</NavLink>,
						icon: <FaUmbrellaBeach className="nav-menu-icon" />,
				  }
				: null,
			{
				key: "Promotions",
				label: <NavLink to={"/pormotion"}>Promotions</NavLink>,
				icon: <FaMoneyBillTrendUp className="nav-menu-icon" />,
			},
			{
				key: "Recruitment",
				label: <NavLink to={"/recruitment"}>Recruitment</NavLink>,
				icon: <MdOutlinePersonSearch className="nav-menu-icon" />,
			},
			{
				key: "Employment",
				label: <NavLink to={"/employment"}>Employment</NavLink>,
				icon: <GiDesk className="nav-menu-icon" />,
			},
			{
				key: "Dismissed",
				label: <NavLink to={"/dismissed"}>Dismissed</NavLink>,
				icon: <TbUserCancel className="nav-menu-icon" />,
			},
		],
	},
];

const NavigationMenu: React.FC = () => {
	const onClick: MenuProps["onClick"] = (e) => {
		console.log("click ", e);
	};

	return (
		<section className="side-nevigation-container">
			<NavigationMenuLogo />
			<LogedUserPanel />
			<Menu
				onClick={onClick}
				className="side-nevigation-menu"
				defaultSelectedKeys={["Dashboard"]}
				defaultOpenKeys={["You"]}
				mode="inline"
				items={items}
			/>
			<h1>World</h1>
		</section>
	);
};

export default NavigationMenu;
