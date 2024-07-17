import type { MenuProps } from "antd";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { Paths, capitalizeFirstLetter } from "../../utils/paths";
import "../../styles/Navigation/NavigationMenu.css";

const navElements = [Paths.Dashboard, Paths.Employee, Paths.Company];

const items: any = navElements.map((element) => {
	return {
		key: `${element.path}`,
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

const NavigationMenu = () => {
	const onClick: MenuProps["onClick"] = (e) => {
		console.log("click ", e);
	};

	const location = useLocation();
	const defaultSelectedKey = location.pathname.split("/").filter((x) => x);
	return (
		<>
			<Menu
				onClick={onClick}
				className="side-nevigation-menu"
				defaultSelectedKeys={[defaultSelectedKey[1]]}
				defaultOpenKeys={[defaultSelectedKey[0]]}
				mode="inline"
				items={items}
			/>
		</>
	);
};

export default NavigationMenu;
