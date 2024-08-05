import { InventaryDataType } from "../types/InventaryDataType";
import { createTableColumns } from "../../../components/Table/Table";
import Button from "../../../components/Shared/Button";
import { ConfigProvider, Flex, Progress, Typography } from "antd";
import { TableProps } from "antd";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";

type InventaryColumnType = (
	data: InventaryDataType[],
	onEdit: (id: string, value: number) => void,
) => TableProps<InventaryDataType>["columns"];

function calcPercantage(reserved: number, quantity: number) {
	return parseFloat(((reserved / quantity) * 100).toFixed(1));
}

const createColumns: InventaryColumnType = (data, onEdit) => {
	return [
		createTableColumns({
			title: "Asset Type",
			dataIndex: "assetType",
			key: "assetType",
		}),
		createTableColumns({
			title: "Available",
			dataIndex: "reserved",
			key: "reserved",
			displayAs: (value, record) => {
				const percentage = calcPercantage(record.quantity - record.reserved, record.quantity);
				const available = record.quantity - record.reserved;
				return (
					<ConfigProvider
						theme={{
							components: {
								Progress: {
									defaultColor: "#2A9BE6",
								
								},
							},
						}}
					>
						<Progress
							percentPosition={{ align: "end", type: "inner" }}
							format={(percent) => `${available} ${percent && percent > 20 ? "Available" : ""}`}
							size={["100%", 20]}
							percent={percentage}
							status={percentage > 80 ? "success" : percentage <= 30 ? "exception" : "normal"}
						/>
					</ConfigProvider>
				);
			},
			width: "40%",
		}),
		createTableColumns({
			title: "Reserved",
			dataIndex: "reserved",
			key: "reserved",
			width: 10,
		}),
		createTableColumns({
			title: "Total quantity",
			dataIndex: "quantity",
			key: "quantity",
			displayAs: (value) => {
				return <Typography.Text> {value} </Typography.Text>;
			},
			align: "center",
		}),
	];
};

export default createColumns;
