import NavigationIcons from "./NavigationIcons";
import PageRoutesComponents from "../pages";
import { isHR } from "./utils";

const isHr = isHR();

function isOnlyHr(path: string, icon: any, pageElement: any) {
	return isHr ? [{ path, icon, pageElement }] : [];
}

export const Paths = {
	Login: {
		path: "/",
		pageElement: PageRoutesComponents.LoginPage,
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
			...isOnlyHr(
				"recruitment",
				NavigationIcons.MdOutlinePersonSearch,
				PageRoutesComponents.RecruitmentPage,
			),
		],
	},
	Employee: {
		path: "",
		type: "group",
		icon: null,
		children: [
			...isOnlyHr("employee", NavigationIcons.UserOutlined, PageRoutesComponents.EmploymentPage),
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
	Background: {
		path: "company-background",
		children: [
			{
				path: "",
				pageElement: PageRoutesComponents.CompanyBackgroundPage,
			},
		],
	},
	Management: {
		path: "managment",
		type: !isHr ? "group" : "",
		icon: NavigationIcons.Management,
		children: [
			{
				path: "salary",
				icon: NavigationIcons.RiMoneyEuroCircleLine,
				pageElement: PageRoutesComponents.SalariesPage,
			},
			...isOnlyHr(
				"promotions",
				NavigationIcons.PiChartLineUpBold,
				PageRoutesComponents.PromotionPage,
			),
			...isOnlyHr("dismissed", NavigationIcons.TbUserCancel, PageRoutesComponents.DismissedPage),
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
