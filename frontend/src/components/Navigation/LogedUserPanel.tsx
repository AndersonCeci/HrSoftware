import { Avatar, Card, Skeleton, Switch } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";

import { useState, useEffect } from "react";

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
			<Card style={{ width: 300 }}>
				<Skeleton loading={loading} avatar active>
					<Meta
						avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
						title="ILVIO CUMANI"
						description="INTERN"
					/>
				</Skeleton>
			</Card>
		</>
	);
};

export default LogedUserPanel;
