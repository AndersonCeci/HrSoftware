import { createTableColumns, getAllUniqueValues } from "../../../components/Table/Table";
import { Button, Space } from "antd";
import { RequestedDataType } from "../types/RequestedLeave";

type createColumnsProps = {
	data: RequestedDataType[];
	onAcept: (id: string) => void;
	onDelete: (record: RequestedDataType) => void;
	approvedId: string[];
};

export const createColumns = (
	data: RequestedDataType[],
	onAcept: (id: string) => void,
	onDecline: (record: RequestedDataType) => void,
	approvedId: string[],
) => {
	return [
		createTableColumns({
			title: "Name",
			dataIndex: "EmployeeName",
			key: "name",
		}),
		createTableColumns({
			title: "Leave Type",
			dataIndex: "leaveType",
			key: "leaveType",
			filters: getAllUniqueValues(data, "leaveType"),
			onFilter: (value, record) => record.leaveType.indexOf(value) === 0,
		}),
		createTableColumns({
			title: "Leave From",
			dataIndex: "StartTime",
			key: "leaveFrom",
			displayAs: (value) => <span>{new Date(value).toLocaleDateString()}</span>,
		}),
		createTableColumns({
			title: "Leave To",
			dataIndex: "EndTime",
			key: "leaveTo",
			displayAs: (value) => <span>{new Date(value).toLocaleDateString()}</span>,
		}),
		createTableColumns({
			title: "Action",
			dataIndex: "_id",
			key: "action",
			align: "center",
			width: 150,
			displayAs: (text, record) => (
				<Space size="middle">
					<Button
						onClick={() => onAcept(record._id)}
						style={{
							background: approvedId.includes(record._id) ? "green" : "#246AFE",
							color: "white",
						}}
						disabled={approvedId.includes(record._id)}
					>
						{approvedId.includes(record.id) ? "Approved" : "Approve"}
					</Button>
					<Button onClick={() => onDecline(record)} danger type="text">
						Decline
					</Button>
				</Space>
			),
		}),
	];
};
