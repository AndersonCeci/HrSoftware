import Button from "../Shared/Button";
import { Flex, Menu } from "antd";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Paths } from "../../utils/paths";
import "../../styles/Navigation/NavigationMenu.css";
import { LogoutOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LogedUserPanel from "./LogedUserPanel";

const navElements = [
  Paths.Dashboard,
  Paths.Recruitment,
  Paths.Employee,
  Paths.Management,
  Paths.DayOff,
  Paths.Company,
];

const NavigationMenu = ({ colapsed }: { colapsed: boolean }) => {
  const [defaultSelectedKey, setDefaultSelectedKey] = useState(
    useLocation()
      .pathname.split("/")
      .filter((x) => x),
  );

  const location = useLocation();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const items: any = navElements.map((element, index) => {
    return {
      key: `${element.path} ${index}`,
      label: t(element.path),
      type: element.type ? element.type : null,
      icon: element.icon ? <element.icon className="nav-menu-icon" /> : null,
      children: element.children.map((subElement, subIndex) => {
        return {
          key: `${element.path}/${subElement.path} ${subIndex}`,
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
  }, [location.pathname]);

  const handleClick = () => {
    localStorage.removeItem("userData");
    navigate("/");
  };

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
          // onClick={onClick}/
          className="side-nevigation-menu"
          defaultSelectedKeys={[
            defaultSelectedKey[defaultSelectedKey.length - 1],
          ]}
          defaultOpenKeys={[defaultSelectedKey[defaultSelectedKey.length - 2]]}
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
