import type { MenuProps } from "antd";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { Paths, capitalizeFirstLetter } from "../../utils/paths";
import "../../styles/Navigation/NavigationMenu.css";
import { useEffect, useState } from "react";

const navElements = [Paths.Dashboard, Paths.Employee, Paths.DayOff, Paths.Company];

const items: any = navElements.map((element) => {
	return {
		key: `${element.path}`,
		label: capitalizeFirstLetter(element.path),
		type: element.type ? element.type : null,
		icon: element.icon ? <element.icon className="nav-menu-icon" /> : null,
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
	const [defaultSelectedKey, setDefaultSelectedKey] = useState(
		useLocation()
			.pathname.split("/")
			.filter((x) => x),
	);

	const location = useLocation();

	useEffect(() => {
		setDefaultSelectedKey(location.pathname.split("/").filter((x) => x));
		console.log(defaultSelectedKey);
	}, [location.pathname]);

	return (
		<>
			<Menu
				// onClick={onClick}/
				className="side-nevigation-menu"
				defaultSelectedKeys={[defaultSelectedKey[defaultSelectedKey.length - 1]]}
				defaultOpenKeys={[defaultSelectedKey[defaultSelectedKey.length - 2]]}
				spellCheck={true}
				mode="inline"
				items={items}
			/>
		</>
	);
};

export default NavigationMenu;
