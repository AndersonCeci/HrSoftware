import { Avatar, Card, Flex } from "antd";

import "../../styles/Navigation/LogedUserPanel.css";
import { Link, useNavigate } from "react-router-dom";

const { Meta } = Card;

type LogedUserPanelProps = {
	colapsed: boolean;
};

const LogedUserPanel = ({ colapsed }: LogedUserPanelProps) => {
	const userData = JSON.parse(localStorage.getItem("userData") || "{}");

	return (
		<>
    <Link to={"/profile"}>
			{!colapsed ? (
				<Card className="loged-user-card">
					<Meta
						avatar={<Avatar size={"large"} src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
						title={userData.username}
						description={userData.role.toUpperCase()}
						className="loged-user-panel"
					/>
				</Card>
			) : (
				<Flex className="colapsed-avatar-container" justify="center">
					<Avatar  size={"large"} src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
				</Flex>
			)}
      </Link>
		</>
	);
};

export default LogedUserPanel;
