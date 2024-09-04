import { Avatar, Card, Flex } from "antd";
import "../../styles/Navigation/LogedUserPanel.css";
import { Link } from "react-router-dom";
import { getFromLocalStorage } from "../../utils/utils";
import useHttp from "../../hooks/useHttp";
import { useEffect, useState } from "react";
import { EmployeeDataType } from "../../pages/Employment/types/Employee";

const { Meta } = Card;

type LogedUserPanelProps = {
	colapsed: boolean;
};

const API = import.meta.env.REACT_APP_EMPLOYEE_API;

const LogedUserPanel = ({ colapsed }: LogedUserPanelProps) => {
	const userData = getFromLocalStorage();

	const [employData, setEmployData] = useState<EmployeeDataType>();
	const [, , fetchData] = useHttp();

	useEffect(() => {
		fetchData(
			{
				url: `${API}/${userData?.employID}`,
			},

			setEmployData,
		);
	}, []);

	return (
		<>
			<Link to={"/profile"}>
				{!colapsed ? (
					<Card className="loged-user-card">
						<Meta
							avatar={<Avatar size={"large"} src={employData?.profilePhoto} />}
							title={userData?.username}
							description={userData?.role}
							className="loged-user-panel"
						/>
					</Card>
				) : (
					<Flex className="colapsed-avatar-container" justify="center">
						<Avatar size={"large"} src={employData?.profilePhoto} />
					</Flex>
				)}
			</Link>
		</>
	);
};

export default LogedUserPanel;
