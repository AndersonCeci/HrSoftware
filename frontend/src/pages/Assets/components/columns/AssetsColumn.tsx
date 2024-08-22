import { createTableColumns, getAllUniqueValues } from "../../../../components/Table/Table";
import { SearchOutlined } from "@ant-design/icons";
import { TableProps } from "antd";
import { t } from "i18next";
import { AssetDatatype } from "../../types/AssetsDataType";

export function getColumns(tableData: AssetDatatype[]): TableProps<AssetDatatype>["columns"] {
	return [
		createTableColumns({
			title: t("employee"),
			dataIndex: "userName",
			key: "employee",
			filterDropdown: true,
			filterIcon: <SearchOutlined className="nav-menu-icon" />,
			width: 150,
			onFilter: (inputValue, filter) =>
				filter.userName.toLowerCase().includes(inputValue.toLowerCase()),
			displayAs: (_, record) => {
				// console.log(record);
				
				return <></>;
			},
		}),
		createTableColumns({
			title: t("assetType"),
			dataIndex: "assetName",
			key: "type",
			width: 150,
			filters: getAllUniqueValues(tableData, "assetType"),
			onFilter: (value, record) => record.assetType.indexOf(value) === 0,
		}),
		createTableColumns({
			title: t("dateGiven"),
			dataIndex: "dateGiven",
			key: "date",
			width: 150,
			displayAs: (value) => <span>{new Date(value).toLocaleDateString()}</span>,
		}),
		createTableColumns({ title: t("code"), dataIndex: "assetCode", key: "code", width: 150 }),
	];
}
