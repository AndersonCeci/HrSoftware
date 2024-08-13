import { Tag, Typography, Dropdown } from "antd";
import { AssetStatus } from "../../types/AssetsDataType";
import { createTableColumns } from "../../../../components/Table/Table";
import Button from "../../../../components/Shared/Button";

import { DeleteOutlined, MoreOutlined, ToolOutlined } from "@ant-design/icons";
import { FaRegCheckCircle } from "react-icons/fa";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { BsFillPersonDashFill } from "react-icons/bs";

export function expandedColumns(onChangeStatus: (newStatus: AssetStatus, record: any) => void) {
	return [
		createTableColumns({
			title: "Code",
			dataIndex: "assetCodes",
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
			displayAs: (_, record) => {
				const isAvailable = record.status === AssetStatus.Available;
				const isOnRepair = record.status === AssetStatus.OnRepair;
				return (
					<Tag color={isAvailable ? "green" : isOnRepair ? "orange" : "red"}>{record.status}</Tag>
				);
			},
			align: "center",
			width: 20,
		}),
		createTableColumns({
			title: "Actions",
			dataIndex: "_id",
			key: "actions",
			displayAs: (_, record) => {
				const { status } = record;
				const isAvailable = status === "Available";
				const isOnRepair = status === "OnRepair";

				return (
					<Dropdown
						menu={{
							items: [
								!isOnRepair
									? {
											key: "Assign",
											label: (
												<Button
													type="text"
													size="large"
													block
													icon={isAvailable ? <BsFillPersonCheckFill /> : <BsFillPersonDashFill />}
													iconPosition="end"
													onClick={() =>
														onChangeStatus(
															isAvailable ? AssetStatus.Assigned : AssetStatus.Available,
															record,
														)
													}
												>
													{isAvailable ? "Assign" : "Unassign"}
												</Button>
											),
									  }
									: null,
								{
									key: "Repair",
									label: (
										<Button
											type="text"
											size="large"
											icon={isOnRepair ? <FaRegCheckCircle /> : <ToolOutlined />}
											style={{ color: isOnRepair ? "green" : "orange" }}
											block
											onClick={() =>
												onChangeStatus(
													isOnRepair ? AssetStatus.Available : AssetStatus.OnRepair,
													record,
												)
											}
											iconPosition="end"
										>
											{!isOnRepair ? "Repair" : "Repaired"}
										</Button>
									),
								},
								{
									key: "Delete",
									label: (
										<Button
											type="text"
											size="large"
											danger
											icon={<DeleteOutlined />}
											block
											iconPosition="end"
										>
											Delete
										</Button>
									),
								},
							],
						}}
						arrow
						placement="bottom"
						trigger={["click"]}
					>
						<Button type="text" block icon={<MoreOutlined />} />
					</Dropdown>
				);
			},
			align: "center",
			width: 20,
		}),
	];
}
