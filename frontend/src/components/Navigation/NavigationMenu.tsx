import type { MenuProps } from "antd";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { Paths, capitalizeFirstLetter } from "../../utils/paths";
import LogedUserPanel from "./LogedUserPanel";
import "../../styles/Navigation/NavigationMenu.css";

type MenuItem = Required<MenuProps>["items"][number];

const navElements = [Paths.Dashboard, Paths.Employee, Paths.Company];

const items: any = navElements.map((element, index) => {
	return {
		key: `${element.path}-${index}`,
		label: capitalizeFirstLetter(element.path),
		type: element.type ? element.type : null,
		children: element.children.map((subElement) => {
			return {
				key: subElement.path,
				label: (
					<NavLink to={`${element.path}/${subElement.path}`}>
						{capitalizeFirstLetter(subElement.path)}
					</NavLink>
				),
				icon: <subElement.icon className="nav-menu-icon" />,
			};
		}),
	};
});

type NavigationMenuType = {
	colapsed: boolean;
};

const NavigationMenu = ({colapsed} : NavigationMenuType) => {
	const onClick: MenuProps["onClick"] = (e) => {
		console.log("click ", e);
	};

	const location = useLocation();
	const defaultSelectedKey = location.pathname.split("/").filter((x) => x);

	return (
		<section className="side-nevigation-container">
			{!colapsed && <LogedUserPanel />}
			<Menu
				onClick={onClick}
				className="side-nevigation-menu"
				defaultSelectedKeys={[defaultSelectedKey[1]]}
				defaultOpenKeys={[defaultSelectedKey[0]]}
				mode="inline"
				items={items}
			/>
		</section>
	);
};

export default NavigationMenu;
