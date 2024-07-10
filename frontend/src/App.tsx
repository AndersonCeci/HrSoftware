import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import PageRoutesComponents from "./pages";
import { Paths } from "./enums/paths";

import "./App.css";

const router = createBrowserRouter([
	{
		index: true,
		element: <PageRoutesComponents.LoginPAge />,
	},
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				path: Paths.Dashboard,
				element: <PageRoutesComponents.DashboardPage />,
			},
			{
				path: Paths.PersonalCalendar,
				element: <PageRoutesComponents.PersonalCalendarPage />,
			},
			{
				path: Paths.CompanyBackground,
				element: <PageRoutesComponents.CompanyBackgroundPage />,
			},
			{
				path: Paths.Notifications,
				element: <PageRoutesComponents.NotificationPage />,
			},
			{
				path: Paths.Events,
				element: <PageRoutesComponents.EventPage />,
			},
			{
				path: Paths.Assets,
				element: <PageRoutesComponents.AssetsPage />,
			},
			{
				path: Paths.OrganisationalStructure,
				element: <PageRoutesComponents.OrganisationalStructurePage />,
			},
			{
				path: Paths.Salaries,
				element: <PageRoutesComponents.SalariesPage />,
			},
			{
				path: Paths.DayOff,
				element: <PageRoutesComponents.DayOffPage />,
			},
			{
				path: Paths.Promotion,
				element: <PageRoutesComponents.PromotionPage />,
			},
			{
				path: Paths.Recruitment,
				element: <PageRoutesComponents.RecruitmentPage />,
			},
			{
				path: Paths.Employment,
				element: <PageRoutesComponents.EmploymentPage />,
			},
			{
				path: Paths.Dismissed,
				element: <PageRoutesComponents.DismissedPage />,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
