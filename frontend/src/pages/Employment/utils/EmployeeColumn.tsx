import {
  createTableColumns,
  getAllUniqueValues,
} from "../../../components/Table/Table";
import { MoreOutlined, SearchOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import Button from "../../../components/Shared/Button";
import { ButtonType } from "../../../enums/Button";
import { TableProps, Dropdown } from "antd";
import { EmployeeDataType } from "../types/Employee";
import { capitalizeFirstLetter } from "../../../utils/paths";

export function getColumns(
  tableData: EmployeeDataType[],
  onEdit: (record: EmployeeDataType) => void,
  onDelete: (id: EmployeeDataType) => void
): TableProps<EmployeeDataType>["columns"] {
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
      },
    }),
    createTableColumns({
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    }),
    createTableColumns({
      title: "Personal Number",
      dataIndex: "nID",
      key: "nID",
    }),
    createTableColumns({
      title: "Email",
      dataIndex: "email",
      key: "email",
    }),
    // createTableColumns({
    // 	title: "Status",
    // 	dataIndex: "status",
    // 	key: "status",
    // 	displayAs: (value) => {
    // 		return (
    // 			<Tag
    // 				color={value === "Working" ? "green" : value === "Remote" ? "blue" : "yellow"}
    // 				key={value}
    // 			>
    // 				{value}
    // 			</Tag>
    // 		);
    // 	},
    // 	filters: getAllUniqueValues(tableData, "status"),
    // 	align: "center",
    // 	onFilter: (value, record) => record.status.indexOf(value) === 0,
    // }),
    createTableColumns({
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phone",
    }),
    createTableColumns({
      title: "Position",
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
      title: "Action",
      dataIndex: "id",
      key: "action",
      displayAs: (text, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "Edit",
                label: (
                  <Button
                    type={ButtonType.TEXT}
                    block
                    onClick={() => onEdit(record)}
                  >
                    Edit
                  </Button>
                ),
              },
              {
                key: "Delete",
                label: (
                  <Button
                    type={ButtonType.TEXT}
                    block
                    onClick={() => onDelete(record)}
                    danger
                  >
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
      align: "center",
      width: 30,
    }),
  ];
}
