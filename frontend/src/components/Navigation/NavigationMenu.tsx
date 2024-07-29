import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Paths, capitalizeFirstLetter } from "../../utils/paths";
import "../../styles/Navigation/NavigationMenu.css";
import { LogoutOutlined } from "@ant-design/icons";

const navElements = [
  Paths.Dashboard,
  Paths.Employee,
  Paths.DayOff,
  Paths.Company,
];

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
    // console.log("click ", e);
  };

  const location = useLocation();
  const navigate = useNavigate();
  const defaultSelectedKey = location.pathname.split("/").filter((x) => x);
  const handleClick = () => {
    localStorage.removeItem("userData");
    console.log("Cleared?", localStorage.getItem("token"));
    navigate("/");
  };

  return (
    <>
      <Menu
        // onClick={onClick}/
        className="side-nevigation-menu"
        defaultSelectedKeys={[defaultSelectedKey[1]]}
        defaultOpenKeys={[defaultSelectedKey[0]]}
        mode="inline"
        items={items}
      />
      <Button
        size="large"
        style={{
          border: "none",
          color: "red",
          margin: "auto",
          display: "flex",
        }}
        type="text"
        onClick={handleClick}
      >
        <LogoutOutlined />
        Log Out
      </Button>
    </>
  );
};

export default NavigationMenu;
