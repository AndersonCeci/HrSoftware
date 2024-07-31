import type { MenuProps } from "antd";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { Paths, capitalizeFirstLetter } from "../../utils/paths";
import "../../styles/Navigation/NavigationMenu.css";
import { useEffect, useState } from "react";
// import { t } from "i18next";
import { useTranslation } from "react-i18next";

const navElements = [
  Paths.Dashboard,
  Paths.Employee,
  Paths.DayOff,
  Paths.Company,
];

const NavigationMenu = () => {
  const [defaultSelectedKey, setDefaultSelectedKey] = useState(
    useLocation()
      .pathname.split("/")
      .filter((x) => x)
  );

  const location = useLocation();
  const { t } = useTranslation();

  const items: any = navElements.map((element) => {
    return {
      key: `${element.path}`,
      label:
        element.path === "time-off"
          ? capitalizeFirstLetter(element.path)
          : t(element.path),
      type: element.type ? element.type : null,
      icon: element.icon ? <element.icon className="nav-menu-icon" /> : null,
      children: element.children.map((subElement) => {
        return {
          key: subElement.path,
          label: (
            <NavLink to={`${element.path}/${subElement.path}`}>
              {t(subElement.path)}
            </NavLink>
          ),
          icon: <subElement.icon className="nav-menu-icon" />,
        };
      }),
    };
  });

  useEffect(() => {
    setDefaultSelectedKey(location.pathname.split("/").filter((x) => x));
    console.log(defaultSelectedKey);
  }, [location.pathname]);

  return (
    <>
      <Menu
        className="side-nevigation-menu"
        defaultSelectedKeys={[
          defaultSelectedKey[defaultSelectedKey.length - 1],
        ]}
        defaultOpenKeys={[defaultSelectedKey[defaultSelectedKey.length - 2]]}
        spellCheck={true}
        mode="inline"
        items={items}
      />
    </>
  );
};

export default NavigationMenu;
