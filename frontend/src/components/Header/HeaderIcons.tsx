import { useState } from "react";
import { Paths } from "../../utils/paths";
import NavigationLink from "../Shared/NavigationLink";
import { Avatar, Badge, Popover } from "antd";
import "../Notifications/NotificationStyle.css";
import NotificationContent from "../Notifications/NotificationContent";
import { BellOutlined } from "@ant-design/icons";


const logout = () => {
  localStorage.removeItem("userData");
  console.log("Cleared?", localStorage.getItem("token"));
};

const HeaderIcons: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenChange = () => {
    setOpen(!open);
  }

  const navigationLinkList = [
    {
      icon: (
        <Paths.PersonalCalendar.icon
          style={{ color: "white" }}
          className="nav-menu-icon white-icon"
        />
      ),
      linkTo: `${Paths.PersonalCalendar.path}`,
    },
    {
      icon: (
        <Popover
          // className="ant-popover-inner"
          content={<NotificationContent />}
          title="Notifications"
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}
        >
          <Badge count={10} size="small">
            <BellOutlined
              style={{ color: "white" }}
              className="nav-menu-icon white-icon"
            />
          </Badge>
        </Popover>
      ),
    },
    {
      icon: (
        <Paths.Profile.icon
          style={{ color: "white" }}
          className="nav-menu-icon white-icon"
        />
      ),
      linkTo: `${Paths.Profile.path}`,
    },
  ];

  return (
    <ul className="header-icons-list">
      {navigationLinkList.map((item, index) => (
        <li key={index}>
          <NavigationLink {...item} />
        </li>
      ))}
    </ul>
  );
};

export default HeaderIcons;
