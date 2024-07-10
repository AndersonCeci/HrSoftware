import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import PageRoutesComponents from "./pages";
import { Paths } from "./utils/paths";

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
				path: Paths.YourInfo.path,
				children: [
					{
						path: Paths.YourInfo.elements.Dashboard,
						element: <PageRoutesComponents.DashboardPage />,
					},
					{
						path: Paths.YourInfo.elements.PersonalCalendar,
						element: <PageRoutesComponents.PersonalCalendarPage />,
					},
				],
			},
			{
				path: Paths.Company.path,
				children: [
					{
						path: Paths.Company.elements.CompanyBackground,
						element: <PageRoutesComponents.CompanyBackgroundPage />,
					},
					{
						path: Paths.Company.elements.Notifications,
						element: <PageRoutesComponents.NotificationPage />,
					},
					{
						path: Paths.Company.elements.Events,
						element: <PageRoutesComponents.EventPage />,
					},
					{
						path: Paths.Company.elements.Assets,
						element: <PageRoutesComponents.AssetsPage />,
					},
					{
						path: Paths.Company.elements.OrganisationalStructure,
						element: <PageRoutesComponents.OrganisationalStructurePage />,
					},
				],
			},
			{
				path: Paths.Employee.path,
				children: [
					{
						path: Paths.Employee.elements.Salaries,
						element: <PageRoutesComponents.SalariesPage />,
					},
					{
						path: Paths.Employee.elements.DayOff,
						element: <PageRoutesComponents.DayOffPage />,
					},
					{
						path: Paths.Employee.elements.Promotion,
						element: <PageRoutesComponents.PromotionPage />,
					},
					{
						path: Paths.Employee.elements.Recruitment,
						element: <PageRoutesComponents.RecruitmentPage />,
					},
					{
						path: Paths.Employee.elements.Employment,
						element: <PageRoutesComponents.EmploymentPage />,
					},
					{
						path: Paths.Employee.elements.Dismissed,
						element: <PageRoutesComponents.DismissedPage />,
					},
				],
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
