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
	Background: {
		path: "company-background",
		// icon: NavigationIcons.BgColorsOutlined,
		children: [{
			path: "",
			pageElement: PageRoutesComponents.CompanyBackgroundPage,
		}],
	},
	Employee: {
		path: "employee",
		type: "",
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
				path: "day-off",
				icon: NavigationIcons.FaUmbrellaBeach,
				pageElement: PageRoutesComponents.DayOffPage,
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
	Company: {
		path: "company",
		type: "",
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
