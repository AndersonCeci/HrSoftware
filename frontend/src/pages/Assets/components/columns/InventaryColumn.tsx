import { AssetDatatype, InventaryDataType } from "../../types/AssetsDataType";
import { createTableColumns } from "../../../../components/Table/Table";
import Button from "../../../../components/Shared/Button";
import { PlusCircleOutlined } from "@ant-design/icons";
import { TableProps, Typography } from "antd";
import Progress from "../../../../components/Shared/Progress";
import create from "@ant-design/icons/lib/components/IconFont";

type InventaryColumnType = (
	data: AssetDatatype[],
	onEdit: (record: AssetDatatype) => void,
) => TableProps<InventaryDataType>["columns"];

function calcPercantage(reserved: number, quantity: number) {
	return parseFloat(((reserved / quantity) * 100).toFixed(1));
}

const createColumns: InventaryColumnType = (data, onEdit) => {
	return [
		createTableColumns({
			title: "Asset Name",
			dataIndex: "assetName",
			key: "assetType",
		}),
		createTableColumns({
			title: "Available",
			dataIndex: "_id",
			key: "reserved",
			displayAs: (_, record) => {
				const quantity: number = data.find((item) => item._id === record._id)?.quantity || 0;
				const percentage = calcPercantage(quantity - record.reserved - record.onRepair, quantity);

				const available = quantity - record.reserved - record.onRepair;
				return (
					<Progress
						percentPosition={{ align: "end", type: "inner" }}
						format={(percent) =>
							`${available} / ${quantity} ${percent && percent > 20 ? "Available" : ""}`
						}
						percentage={percentage}
						status={
							percentage > 80
								? "success"
								: percentage <= 15 || quantity === 0
								? "exception"
								: "normal"
						}
					/>
				);
			},
			width: "40%",
		}),
		createTableColumns({
			title: "Total quantity",
			dataIndex: "quantity",
			key: "quantity",
			displayAs: (value) => {
				return <Typography.Text>{value}</Typography.Text>;
			},
		}),
		createTableColumns({
			title: "Reserved",
			dataIndex: "reserved",
			key: "reserved",
		}),
		createTableColumns({
			title: "On Repair",
			dataIndex: "onRepair",
			key: "onRepair",
		}),

		createTableColumns({
			title: "Edit",
			dataIndex: "_id",
			key: "quantity",
			displayAs: (_, record) => {
				return (
					<Button type="text" icon={<PlusCircleOutlined />} onClick={() => onEdit(record)}>
						Add
					</Button>
				);
			},
			align: "center",
			width: 50,
		}),
	];
};

export default createColumns;
