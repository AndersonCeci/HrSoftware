import { createTableColumns, getAllUniqueValues } from "../../../components/Table/Table";
import { MoreOutlined, SearchOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import Button from "../../../components/Shared/Button";
import { ButtonType } from "../../../enums/Button";
import { TableProps, Dropdown } from "antd";
import { EmployeeDataType } from "../types/Employee";

export function getColumns(tableData: EmployeeDataType[]): TableProps<EmployeeDataType>["columns"] {
	return [
		createTableColumns({
			title: "Name",
			dataIndex: "name",
			key: "name",
			filterDropdown: true,
			onFilter: (inputValue, filter) =>
				filter.name.toLowerCase().includes(inputValue.toLowerCase()),
			filterIcon: <SearchOutlined className="nav-menu-icon" />,
		}),
		createTableColumns({
			title: "Email",
			dataIndex: "email",
			key: "",
		}),
		createTableColumns({
			title: "Poaition",
			dataIndex: "position",
			key: "position",
			filters: getAllUniqueValues(tableData, "position"),
			onFilter: (value, record) => record.position.indexOf(value) === 0,
		}),
		createTableColumns({
			title: "Status",
			dataIndex: "status",
			key: "status",
			displayAs: (value) => {
				return (
					<Tag
						color={value === "Workig" ? "green" : value === "Remote" ? "blue" : "yellow"}
						key={value}
					>
						{value}
					</Tag>
				);
			},
			filters: getAllUniqueValues(tableData, "status"),
			onFilter: (value, record) => record.status.indexOf(value) === 0,
		}),
		createTableColumns({
			title: "Action",
			dataIndex: "id",
			key: "action",
			displayAs: (record) => (
				<Dropdown
					menu={{
						items: [
							{
								key: "Edit",
								label: (
									<Button type={ButtonType.TEXT} block onClick={() => {}}>
										Edit
									</Button>
								),
							},
							{
								key: "Delete",
								label: (
									<Button type={ButtonType.TEXT} block onClick={() => {}} danger>
										Remove
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
