import { Outlet } from "react-router-dom";
import NavigationMenu from "../components/Navigation/NavigationMenu";
import "../styles/RootLayout.css";

const RootLayout: React.FC = () => {
	return (
		<main className="root-container">
			<NavigationMenu />
			<Outlet />
		</main>
	);
};

export default RootLayout;
