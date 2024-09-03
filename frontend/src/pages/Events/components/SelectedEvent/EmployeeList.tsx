import { Avatar, List, Typography } from "antd";
import { useState, useEffect } from "react";
import useHttp from "../../../../hooks/useHttp";
import { EmployeeDataType } from "../../../Employment/types/Employee";
import Loader from "../../../../components/Shared/Loader";
import { t } from "i18next";
import CODEVIDERNOIMAGELOGO from "../../../../assets/image 99.png";

const API_URL = import.meta.env.REACT_APP_EVENTS_API;

export default function EmployeeList() {
	const [joinedEmployees, setJoinedEmlpoyees] = useState<EmployeeDataType[]>([]);
	const [isLoading, , fetchData] = useHttp();

	useEffect(() => {
		fetchData(
			{
				url: `${API_URL}/events/joined-employees`,
			},
			(data) => {
				setJoinedEmlpoyees(data ? data : []);
			},
		);
	}, []);

	return (
		<section className="employee-list-container">
			{!isLoading ? (
				<List
					header={
						<Typography.Title level={4}>
							<strong>{t("joinedEmployees")}:</strong> {joinedEmployees.length}
						</Typography.Title>
					}
					size="small"
					itemLayout="horizontal"
					dataSource={[1, 2, 34]}
					renderItem={(item) => (
						<List.Item>
							<List.Item.Meta
								title={item}
								avatar={<Avatar src={CODEVIDERNOIMAGELOGO} size={"small"} />}
								// description={<span>{new Date().toLocaleDateString()}</span>}
							/>
						</List.Item>
					)}
				/>
			) : (
				<Loader />
			)}
		</section>
	);
}
