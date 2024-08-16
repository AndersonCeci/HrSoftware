import { Tag, Typography } from "antd";
import { createTableColumns } from "../../../components/Table/Table";

export function expandedColumns() {
	return [
		createTableColumns({
			title: "Code",
			dataIndex: "assetCode",
			key: "code",
		}),
		createTableColumns({
			title: "Employee Name",
			dataIndex: "userName",
			key: "userName",
			displayAs: (text: string) => {
				return <Typography.Text>{text ? text : "Not assigned"}</Typography.Text>;
			},
		}),
		createTableColumns({
			title: "Date",
			dataIndex: "dateGiven",
			key: "dateGiven",
			displayAs: (text: string) => {
				return <Typography.Text>{text ? text : "Not assigned"}</Typography.Text>;
			},
		}),
		createTableColumns({
			title: "Status",
			dataIndex: "status",
			key: "status",
			displayAs: (text: string) => {
				return <Tag color={!text ? "red" : "green"}>{text ? "Available" : "Not Available"}</Tag>;
			},
		}),
	];
}
