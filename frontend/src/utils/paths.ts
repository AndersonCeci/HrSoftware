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
		icon: undefined, 
		children: [
			{
				path: "dashboard",
				icon: NavigationIcons.AppstoreOutlined,
				pageElement: PageRoutesComponents.DashboardPage,
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
	Settings: {
		path: "settings",
		icon: NavigationIcons.IoSettingsOutline,
		children: [
			{
				path: "",
				pageElement: PageRoutesComponents.SettingsPage,
			},
		],
	},
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
	Employee: {
		path: "management",
		type: "",
		icon: NavigationIcons.Management,
		children: [
			{
				path: "recruitment",
				icon: NavigationIcons.MdOutlinePersonSearch,
				pageElement: PageRoutesComponents.RecruitmentPage,
			},
			{
				path: "salary",
				icon: NavigationIcons.TbPigMoney,
				pageElement: PageRoutesComponents.SalariesPage,
			},
			{
				path: "promotions",
				icon: NavigationIcons.FaMoneyBillTrendUp,
				pageElement: PageRoutesComponents.PromotionPage,
			},
			{
				path: "employment",
				icon: NavigationIcons.GiDesk,
				pageElement: PageRoutesComponents.EmploymentPage,
			},
			{
				path: "dismissed",
				icon: NavigationIcons.TbUserCancel,
				pageElement: PageRoutesComponents.DismissedPage,
			},
		],
	},
	DayOff: {
		path: "time-off",
		type: "",
		icon: NavigationIcons.SandClock,
		children: [
			{
				path: "requested-leave",
				icon: NavigationIcons.VscRequestChanges,
				pageElement: PageRoutesComponents.RequestedLeavePage,
			},
			{
				path: "calendar-leave",
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
				path: "organisational-structure",
				icon: NavigationIcons.ApartmentOutlined,
				pageElement: PageRoutesComponents.OrganisationalStructurePage,
			},
		],
	},
};

export function capitalizeFirstLetter(string: string) {
	const words = string.split("-");
	const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
	return capitalizedWords.join(" ");
}
