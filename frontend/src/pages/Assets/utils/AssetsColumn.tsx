import { createTableColumns, getAllUniqueValues } from "../../../components/Table/Table";
import { MoreOutlined, SearchOutlined } from "@ant-design/icons";
import Button from "../../../components/Shared/Button";
import { TableProps, Dropdown } from "antd";
import { ButtonType } from "../../../enums/Button";
import { AssetDatatype } from "../types/AssetsDataType";

export function getColumns(tableData: AssetDatatype[]): TableProps<AssetDatatype>["columns"] {
	return [
		createTableColumns({
			title: "Type",
			dataIndex: "type",
			key: "type",
			filters: getAllUniqueValues(tableData, "type"),
			onFilter: (value, record) => record.type.indexOf(value) === 0,
		}),
		createTableColumns({ title: "Code", dataIndex: "code", key: "code" }),
		createTableColumns({ title: "Date", dataIndex: "date", key: "date" }),
		createTableColumns({
			title: "Employee",
			dataIndex: "employee",
			key: "employee",
			filterDropdown: true,
			filterIcon: <SearchOutlined className="nav-menu-icon" />,
			onFilter: (inputValue, filter) =>
				filter.employee.toLowerCase().includes(inputValue.toLowerCase()),
		}),
		createTableColumns({
			title: "Action",
			dataIndex: "action",
			key: "action",
			displayAs: (record) => (
				<Dropdown
					menu={{
						items: [
							{ key: "Edit", label: <Button type={ButtonType.TEXT}> Edit </Button> },
							{
								key: "Delete",
								label: (
									<Button type={ButtonType.TEXT} danger>
										Delete
									</Button>
								),
							},
						],
					}}
					trigger={["click"]}
				>
					<Button type={ButtonType.TEXT} icon={<MoreOutlined />} />
				</Dropdown>
			),
			fixed: "right",
			width: 30,
		}),
	];
}
