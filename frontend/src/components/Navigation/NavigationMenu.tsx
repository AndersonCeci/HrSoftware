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
import { IoIosLogOut } from "react-icons/io";

import type { MenuProps } from "antd";
import { Menu, Badge, Button } from "antd";
import { NavLink, useLocation } from "react-router-dom";

import { Paths } from "../../enums/paths";
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
				key: Paths.Dashboard,
				label: <NavLink to={Paths.Dashboard}>Dashboard</NavLink>,
				icon: <AppstoreOutlined className="nav-menu-icon" />,
			},
			{
				key: Paths.PersonalCalendar,
				label: <NavLink to={Paths.PersonalCalendar}>Personal Calendar</NavLink>,
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
				key: Paths.CompanyBackground,
				label: <NavLink to={Paths.CompanyBackground}>Company Background</NavLink>,
				icon: <BookOutlined className="nav-menu-icon" />,
			},
			{
				key: Paths.Notifications,
				label: <NavLink to={Paths.Notifications}>Notifications</NavLink>,
				icon: (
					<Badge count={10} size="small">
						<BellOutlined className="nav-menu-icon" />
					</Badge>
				),
			},
			{
				key: Paths.Events,
				label: <NavLink to={Paths.Events}>Events</NavLink>,
				icon: <MdOutlineEventAvailable className="nav-menu-icon" />,
			},
			{
				key: Paths.Assets,
				label: <NavLink to={Paths.Assets}>Assets</NavLink>,
				icon: <RiComputerLine className="nav-menu-icon" />,
			},
			{
				key: Paths.OrganisationalStructure,
				label: <NavLink to={Paths.OrganisationalStructure}>Organisational Structure</NavLink>,
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
				key: Paths.Salaries,
				label: <NavLink to={Paths.Salaries}>Salary</NavLink>,
				icon: <TbPigMoney className="nav-menu-icon" />,
			},
			true
				? {
						key: Paths.DayOff,
						label: <NavLink to={Paths.DayOff}>Day Off</NavLink>,
						icon: <FaUmbrellaBeach className="nav-menu-icon" />,
				  }
				: null,
			{
				key: Paths.Promotion,
				label: <NavLink to={Paths.Promotion}>Promotions</NavLink>,
				icon: <FaMoneyBillTrendUp className="nav-menu-icon" />,
			},
			{
				key: Paths.Recruitment,
				label: <NavLink to={Paths.Recruitment}>Recruitment</NavLink>,
				icon: <MdOutlinePersonSearch className="nav-menu-icon" />,
			},
			{
				key: Paths.Employment,
				label: <NavLink to={Paths.Employment}>Employment</NavLink>,
				icon: <GiDesk className="nav-menu-icon" />,
			},
			{
				key: Paths.Dismissed,
				label: <NavLink to={Paths.Dismissed}>Dismissed</NavLink>,
				icon: <TbUserCancel className="nav-menu-icon" />,
			},
		],
	},
];

const NavigationMenu: React.FC = () => {
	const onClick: MenuProps["onClick"] = (e) => {
		console.log("click ", e);
	};

	const location = useLocation();

	return (
		<section className="side-nevigation-container">
			<NavigationMenuLogo />
			<LogedUserPanel />
			<Menu
				onClick={onClick}
				className="side-nevigation-menu"
				defaultSelectedKeys={[location.pathname.slice(1)]}
				// defaultOpenKeys={["You"]}
				mode="inline"
				items={items}
			/>
			<div className="logout-button-container">
				<NavLink to={Paths.Login}>
					<Button icon={<IoIosLogOut className="nav-menu-icon" />} type="text" danger>
						Logout
					</Button>
				</NavLink>
			</div>
		</section>
	);
};

export default NavigationMenu;
