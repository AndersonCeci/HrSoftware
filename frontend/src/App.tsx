import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import PageRoutesComponents from "./pages";

import "./App.css";

const router = createBrowserRouter([
	{
		index: true,
		element: <h1>LOGIN PAGE</h1>,
	},
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				path: "dashboard",
				element: <PageRoutesComponents.DashboardPage />,
			},
			{
				path: "personal-calendar",
				element: <PageRoutesComponents.PersonalCalendarPage />,
			},
			{
				path: "company-background",
				element: <PageRoutesComponents.CompanyBackgroundPage />,
			},
			{
				path: "notifications",
				element: <PageRoutesComponents.NotificationPage />,
			},
			{
				path: "events",
				element: <PageRoutesComponents.EventPage />,
			},
			{
				path: "assets",
				element: <PageRoutesComponents.AssetsPage />,
			},
			{
				path: "organisational-structure",
				element: <PageRoutesComponents.OrganisationalStructurePage />,
			},
			{
				path: "salaries",
				element: <PageRoutesComponents.SalariesPage />,
			},
			{
				path: "day-off",
				element: <PageRoutesComponents.DayOffPage />,
			},
			{
				path: "pormotion",
				element: <PageRoutesComponents.PromotionPage />,
			},
			{
				path: "recruitment",
				element: <PageRoutesComponents.RecruitmentPage />,
			},
			{
				path: "employment",
				element: <PageRoutesComponents.EmploymentPage />,
			},
			{
				path: "dismissed",
				element: <PageRoutesComponents.DismissedPage />,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
