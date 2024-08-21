import NavigationIcons from "./NavigationIcons";
import PageRoutesComponents from "../pages";

export const Paths = {
  Login: {
    path: "/",
    pageElement: PageRoutesComponents.LoginPAge,
  },
  Dashboard: {
    path: "",
    type: "group",
    icon: null,
    children: [
      {
        path: "dashboard",
        icon: NavigationIcons.AppstoreOutlined,
        pageElement: PageRoutesComponents.DashboardPage,
      },
    ],
  },
  Recruitment: {
    path: "",
    type: "group",
    icon: null,
    children: [
      {
        path: "recruitment",
        icon: NavigationIcons.MdOutlinePersonSearch,
        pageElement: PageRoutesComponents.RecruitmentPage,
      },
    ],
  },
  Employee: {
    path: "",
    type: "group",
    icon: null,
    children: [
      {
        path: "employment",
        icon: NavigationIcons.MdOutlineBadge,
        pageElement: PageRoutesComponents.EmploymentPage,
      },
    ],
  },
  PersonalCalendar: {
    path: "personal-calendar",
    icon: NavigationIcons.CalendarOutlined,
    children: [
      {
        path: "",
        pageElement: PageRoutesComponents.PersonalCalendarPage,
      },
    ],
  },
  Profile: {
    path: "profile",
    icon: NavigationIcons.UserOutlined,
    children: [
      {
        path: "",
        pageElement: PageRoutesComponents.ProfilePage,
      },
    ],
  },
  // Settings: {
  //   path: "settings",
  //   icon: NavigationIcons.IoSettingsOutline,
  //   children: [
  //     {
  //       path: "",
  //       pageElement: PageRoutesComponents.SettingsPage,
  //     },
  //   ],
  // },
  Notifications: {
    path: "notifications",
    icon: NavigationIcons.BellOutlined,
    children: [
      {
        path: "",
        pageElement: PageRoutesComponents.NotificationPage,
      },
    ],
  },
  Background: {
    path: "company-background",
    // icon: NavigationIcons.BgColorsOutlined,
    children: [
      {
        path: "",
        pageElement: PageRoutesComponents.CompanyBackgroundPage,
      },
    ],
  },
  Management: {
    path: "managment",
    type: "",
    icon: NavigationIcons.Management,
    children: [
      // {
      // 	path: "recruitment",
      // 	icon: NavigationIcons.MdOutlinePersonSearch,
      // 	pageElement: PageRoutesComponents.RecruitmentPage,
      // },
      {
        path: "salary",
        icon: NavigationIcons.RiMoneyEuroCircleLine,
        pageElement: PageRoutesComponents.SalariesPage,
      },
      {
        path: "promotions",
        icon: NavigationIcons.PiChartLineUpBold,
        pageElement: PageRoutesComponents.PromotionPage,
      },
      // {
      // 	path: "employment",
      // 	icon: NavigationIcons.MdOutlineBadge,
      // 	pageElement: PageRoutesComponents.EmploymentPage,
      // },
      {
        path: "dismissed",
        icon: NavigationIcons.TbUserCancel,
        pageElement: PageRoutesComponents.DismissedPage,
      },
    ],
  },
  DayOff: {
    path: "dayoff",
    type: "",
    icon: NavigationIcons.SandClock,
    children: [
      {
        path: "requestedLeave",
        icon: NavigationIcons.VscRequestChanges,
        pageElement: PageRoutesComponents.RequestedLeavePage,
      },
      {
        path: "calendarLeave",
        icon: NavigationIcons.BsCalendar4Range,
        pageElement: PageRoutesComponents.CalendarLeavePage,
      },
    ],
  },
  Company: {
    path: "company",
    type: "",
    icon: NavigationIcons.Building,
    children: [
      {
        path: "events",
        icon: NavigationIcons.MdOutlineEventAvailable,
        pageElement: PageRoutesComponents.EventPage,
      },
      {
        path: "assets",
        icon: NavigationIcons.RiComputerLine,
        pageElement: PageRoutesComponents.AssetsPage,
      },
      {
        path: "organisationalStructure",
        icon: NavigationIcons.ApartmentOutlined,
        pageElement: PageRoutesComponents.OrganisationalStructurePage,
      },
    ],
  },
};
