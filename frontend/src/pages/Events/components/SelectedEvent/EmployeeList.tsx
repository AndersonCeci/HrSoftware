import { Avatar, List, Typography } from "antd";
import { useState, useEffect } from "react";
import useHttp from "../../../../hooks/useHttp";
import { EmployeeDataType } from "../../../Employment/types/Employee";
import Loader from "../../../../components/Shared/Loader";
import CODEVIDERNOIMAGELOGO from "../../../../assets/Group 14.svg";
const data = [
	{
		title: "Ant Design Title 1",
	},
	{
		title: "Ant Design Title 2",
	},
	{
		title: "Ant Design Title 3",
	},
	{
		title: "Ant Design Title 4",
	},
	{
		title: "Ant Design Title 1",
	},
	{
		title: "Ant Design Title 2",
	},
	{
		title: "Ant Design Title 3",
	},
	{
		title: "Ant Design Title 4",
	},
	{
		title: "Ant Design Title 1",
	},
	{
		title: "Ant Design Title 2",
	},
	{
		title: "Ant Design Title 3",
	},
	{
		title: "Ant Design Title 4",
	},
	{
		title: "Ant Design Title 1",
	},
	{
		title: "Ant Design Title 2",
	},
	{
		title: "Ant Design Title 3",
	},
	{
		title: "Ant Design Title 4",
	},
	{
		title: "Ant Design Title 1",
	},
	{
		title: "Ant Design Title 2",
	},
	{
		title: "Ant Design Title 3",
	},
	{
		title: "Ant Design Title 4",
	},
	{
		title: "Ant Design Title 1",
	},
	{
		title: "Ant Design Title 2",
	},
	{
		title: "Ant Design Title 3",
	},
	{
		title: "Ant Design Title 4",
	},
];

const API_URL = import.meta.env.REACT_APP_EVENTS_API;

export default function EmployeeList() {
	const [joinedEmployees, setJoinedEmlpoyees] = useState<EmployeeDataType[]>([]);
	const [isLoading, error, fetchData] = useHttp();

	// useEffect(() => {
	// 	fetchData(
	// 		{
	// 			url: `${API_URL}/events/joined-employees`,
	// 		},
	// 		(data) => {
	// 			setJoinedEmlpoyees(data);
	// 		},
	// 	);
	// }, []);

	return (
		<section className="employee-list-container">
			{!isLoading ? (
				<List
					header={
						<Typography.Title level={4}>
							<strong>Joined Employees:</strong> {joinedEmployees.length}
						</Typography.Title>
					}
					size="small"
					itemLayout="horizontal"
					dataSource={data}
					renderItem={(item) => (
						<List.Item>
							<List.Item.Meta
								title={item.title}
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
