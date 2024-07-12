import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import PageRoutesComponents from "./pages";
import { Paths } from "./utils/paths";

import "./App.css";

const iterationRoutes = [
	Paths.Dashboard,
	Paths.PersonalCalendar,
	Paths.Notifications,
	Paths.Company,
	Paths.Employee,
];

const router = createBrowserRouter([
	{
		index: true,
		element: <Paths.Login.pageElement />,
	},
	{
		path: "/",
		element: <RootLayout />,
		children: iterationRoutes.map((route) => {
			return {
				path: route.path,
				children: route.children.map((child) => {
					return {
						path: child.path,
						element: <child.pageElement />,
					};
				}),
			};
		}),
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
