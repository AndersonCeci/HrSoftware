import { TableProps } from "antd";
import { LeftDataType } from "../types/Left";
import { createTableColumns, getAllUniqueValues } from "../../../components/Table/Table";
import { SearchOutlined } from "@ant-design/icons";
import { capitalizeFirstLetter } from "../../../utils/paths";



export function getColumns (
    tableData: LeftDataType[],
    
): TableProps<LeftDataType>["columns"] {
    return [
		createTableColumns({
			title: "Username",
			dataIndex: "username",
			key: "name",
			filterDropdown: true,
			onFilter: (inputValue, filter) =>
				filter.username.toLowerCase().includes(inputValue.toLowerCase()),
			filterIcon: <SearchOutlined className="nav-menu-icon" />,
			displayAs: (value) => {
				return <span>{capitalizeFirstLetter(value)}</span>;
			}
		}),
		createTableColumns({
			title: "Email",
			dataIndex: "email",
			key: "email",
		}),
	
		createTableColumns({
			title: "Phone",
			dataIndex: "phoneNumber",
			key: "phoneNumber",
		}),
		createTableColumns({
			title: "Poaition",
			dataIndex: "position",
			key: "position",
			filters: getAllUniqueValues(tableData, "position"),
			onFilter: (value, record) => record.position.indexOf(value) === 0,
		}),
		createTableColumns({
			title: "Salary",
			dataIndex: "salary",
			key: "salary",
			displayAs: (value) => {
				return <span>{value} €</span>;
			},
		}),
		createTableColumns({
			title: "Start Date",
			dataIndex: "startingDate",
			key: "startDate",
		}),
		createTableColumns({
			title: "Left Date",
			dataIndex: "deletedAt",
			key: "deletedAt",

		}),
	];
}
