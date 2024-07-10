import { Avatar, Card, Skeleton } from "antd";

import { useState, useEffect } from "react";

import "../../styles/Navigation/LogedUserPanel.css";

const { Meta } = Card;

const LogedUserPanel = () => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	}, []);

	return (
		<>
			<Card className="loged-user-card">
				<Skeleton loading={loading} avatar active> 
					<Meta
						avatar={<Avatar size={"large"} src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
						title="ILVIO CUMANI"
						description="Frontend Developer"
						className="loged-user-panel"
					/>
				</Skeleton>
			</Card>
		</>
	);
};

export default LogedUserPanel;
