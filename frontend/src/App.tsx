import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import RootLayout from "./pages/Root/RootLayout";
import { Paths } from "./utils/paths";
import Loader from "./components/Shared/Loader";
import { Suspense } from "react";

import "./App.css";

const iterationRoutes = [
	Paths.Dashboard,
	Paths.Recruitment,
	Paths.PersonalCalendar,
	Paths.Company,
	Paths.Management,
	Paths.Employee,
	Paths.Background,
	Paths.DayOff,
	Paths.Profile,
];

const router = createBrowserRouter([
	{
		path: Paths.Login.path,
		element: <Paths.Login.pageElement />,
	},
	{
		path: "/",
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		children: [
			...iterationRoutes.map((route) => {
				return {
					path: route.path,
					children: route.children.map((child) => {
						return {
							path: child.path,
							element: (
								<Suspense fallback={<Loader />}>
									<child.pageElement />
								</Suspense>
							),
						};
					}),
				};
			}),
			{
				path: "*",
				element: <ErrorPage />,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
