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

import { Paths } from "../../utils/paths";
import NavigationMenuLogo from "./NavigationMenuLogo";
import LogedUserPanel from "./LogedUserPanel";

import "../../styles/Navigation/NavigationMenu.css";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
	{
		key: Paths.YourInfo.path,
		label: "You",
		// type: "group",
		children: [
			{
				key: Paths.YourInfo.elements.Dashboard,
				label: (
					<NavLink to={`/${Paths.YourInfo.path}/${Paths.YourInfo.elements.Dashboard}`}>
						Dashboard
					</NavLink>
				),
				icon: <AppstoreOutlined className="nav-menu-icon" />,
			},
			{
				key: Paths.YourInfo.elements.PersonalCalendar,
				label: (
					<NavLink to={`/${Paths.YourInfo.path}/${Paths.YourInfo.elements.PersonalCalendar}`}>
						Personal Calendar
					</NavLink>
				),
				icon: <CalendarOutlined className="nav-menu-icon" />,
			},
		],
	},
	{
		key: Paths.Company.path,
		label: "Company",
		// type: "group",
		children: [
			{
				key: Paths.Company.elements.CompanyBackground,
				label: (
					<NavLink to={`/${Paths.Company.path}/${Paths.Company.elements.CompanyBackground}`}>
						Company Background
					</NavLink>
				),
				icon: <BookOutlined className="nav-menu-icon" />,
			},
			{
				key: Paths.Company.elements.Notifications,
				label: (
					<NavLink to={`/${Paths.Company.path}/${Paths.Company.elements.Notifications}`}>
						Notifications
					</NavLink>
				),
				icon: (
					<Badge count={10} size="small">
						<BellOutlined className="nav-menu-icon" />
					</Badge>
				),
			},
			{
				key: Paths.Company.elements.Events,
				label: (
					<NavLink to={`/${Paths.Company.path}/${Paths.Company.elements.Events}`}>Events</NavLink>
				),
				icon: <MdOutlineEventAvailable className="nav-menu-icon" />,
			},
			{
				key: Paths.Company.elements.Assets,
				label: (
					<NavLink to={`/${Paths.Company.path}/${Paths.Company.elements.Assets}`}>Assets</NavLink>
				),
				icon: <RiComputerLine className="nav-menu-icon" />,
			},
			{
				key: Paths.Company.elements.OrganisationalStructure,
				label: (
					<NavLink to={`/${Paths.Company.path}/${Paths.Company.elements.OrganisationalStructure}`}>
						Organisational Structure
					</NavLink>
				),
				icon: <ApartmentOutlined className="nav-menu-icon" />,
			},
		],
	},
	{
		key: Paths.Employee.path,
		label: "Employee",
		// type: "group",
		children: [
			{
				key: Paths.Employee.elements.Salaries,
				label: (
					<NavLink to={`${Paths.Employee.path}/${Paths.Employee.elements.Salaries}`}>
						Salary
					</NavLink>
				),
				icon: <TbPigMoney className="nav-menu-icon" />,
			},
			true
				? {
						key: Paths.Employee.elements.DayOff,
						label: (
							<NavLink to={`${Paths.Employee.path}/${Paths.Employee.elements.DayOff}`}>
								Day Off
							</NavLink>
						),
						icon: <FaUmbrellaBeach className="nav-menu-icon" />,
				  }
				: null,
			{
				key: Paths.Employee.elements.Promotion,
				label: (
					<NavLink to={`${Paths.Employee.path}/${Paths.Employee.elements.Promotion}`}>
						Promotions
					</NavLink>
				),
				icon: <FaMoneyBillTrendUp className="nav-menu-icon" />,
			},
			{
				key: Paths.Employee.elements.Recruitment,
				label: (
					<NavLink to={`${Paths.Employee.path}/${Paths.Employee.elements.Recruitment}`}>
						Recruitment
					</NavLink>
				),
				icon: <MdOutlinePersonSearch className="nav-menu-icon" />,
			},
			{
				key: Paths.Employee.elements.Employment,
				label: (
					<NavLink to={`${Paths.Employee.path}/${Paths.Employee.elements.Employment}`}>
						Employment
					</NavLink>
				),
				icon: <GiDesk className="nav-menu-icon" />,
			},
			{
				key: Paths.Employee.elements.Dismissed,
				label: (
					<NavLink to={`${Paths.Employee.path}/${Paths.Employee.elements.Dismissed}`}>
						Dismissed
					</NavLink>
				),
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
	const defaultSelectedKey = location.pathname.split("/").filter((x) => x);

	return (
		<section className="side-nevigation-container">
			<NavigationMenuLogo />
			<LogedUserPanel />
			<Menu
				onClick={onClick}
				className="side-nevigation-menu"
				defaultSelectedKeys={[defaultSelectedKey[1]]}
				defaultOpenKeys={[defaultSelectedKey[0]]}
				mode="inline"
				items={items}
			/>
			<div className="logout-button-container">
				<NavLink to={Paths.Login.path}>
					<Button icon={<IoIosLogOut className="nav-menu-icon" />} type="text" danger>
						Logout
					</Button>
				</NavLink>
			</div>
		</section>
	);
};

export default NavigationMenu;
