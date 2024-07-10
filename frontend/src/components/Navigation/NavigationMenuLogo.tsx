import CodeviderLogo from "../../assets/codevider_logo-removebg-preview 1.svg"
import "../../styles/Navigation/NavigationMenuLogo.css"

const NavigationMenuLogo = () => {
	return (
		<div className="navigation-menu-logo">
			<img className="navigation-menu-logo-image" src={CodeviderLogo} alt="" />
			<h1 className="navigation-menu-logo-text">CodeViderHR</h1>
		</div>
	);
};

export default NavigationMenuLogo;
