import { NavLink } from "react-router-dom";
import Icon from '@ant-design/icons';
import "../../styles/Shared/NavigationLink.css"
import { NavigationLinkProps } from "../../types/NavigationLinkProps";

const NavigationLink = ({ text, icon, linkTo, whiteText, handleClick }: NavigationLinkProps) => {
	return (
		<div>
			<NavLink to={`${linkTo}`} onClick={handleClick}>
				{icon && icon}
				{text && <span className={`navlink-text ${whiteText? "white-navlink-text" : "color-navlink-text"}`}>{text}</span>}
			</NavLink>
		</div>
	);
};

export default NavigationLink;
