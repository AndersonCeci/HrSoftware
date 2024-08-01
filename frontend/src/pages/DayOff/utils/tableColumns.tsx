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
			dataIndex: "name",
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
			dataIndex: "leaveFrom",
			key: "leaveFrom",
		}),
		createTableColumns({
			title: "Leave To",
			dataIndex: "leaveTo",
			key: "leaveTo",
		}),
		createTableColumns({
			title: "Reason",
			dataIndex: "reason",
			key: "reason",
		}),
		createTableColumns({
			title: "Action",
			dataIndex: "action",
			key: "action",
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
					<Button
						onClick={() => onDecline(record)}
						style={{ background: "none", color: "red", border: "0" }}
						ghost
					>
						Decline
					</Button>
				</Space>
			),
		}),
	];
};
