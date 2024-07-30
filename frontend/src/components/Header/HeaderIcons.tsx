import { t } from "i18next";
import { Paths } from "../../utils/paths";
import NavigationLink from "../Shared/NavigationLink";
import { Badge } from "antd";
import i18n from "../../utils/i18n";

const logout = () => {
  localStorage.removeItem("userData");
  console.log("Cleared?", localStorage.getItem("token"));
};

const navigationLinkList = [
  {
    icon: <Paths.PersonalCalendar.icon className="nav-menu-icon white-icon" />,
    linkTo: `${Paths.PersonalCalendar.path}`,
  },
  {
    icon: (
      <Badge count={10} size="small">
        <Paths.Notifications.icon className="nav-menu-icon white-icon" />
      </Badge>
    ),
    linkTo: `${Paths.Notifications.path}`,
  },
  {
    icon: <Paths.Settings.icon className="nav-menu-icon white-icon" />,
    linkTo: `${Paths.Settings.path}`,
  },
  {
    text: i18n.t("logOut"),
    linkTo: Paths.Login.path,
    whiteText: true,
    handleClick: logout,
  },
];

const HeaderIcons: React.FC = () => {
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
