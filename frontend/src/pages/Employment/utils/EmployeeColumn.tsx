import {
  createTableColumns,
  getAllUniqueValues,
} from "../../../components/Table/Table";
import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Button from "../../../components/Shared/Button";
import { ButtonType } from "../../../enums/Button";
import { TableProps, Dropdown } from "antd";
import { EmployeeDataType } from "../types/Employee";
import { capitalizeFirstLetter } from "../../../utils/paths";
import { PiChartLineUpBold } from "react-icons/pi";
import { useTranslation } from "react-i18next";


export function getColumns(
  tableData: EmployeeDataType[],
  onEdit: (record: EmployeeDataType) => void,
  onDelete: (id: EmployeeDataType) => void,
  onPromote: (record: EmployeeDataType) => void
): TableProps<EmployeeDataType>["columns"] {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation();
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
                    icon={<EditOutlined />}
                  >
                    {t("edit")}
                  </Button>
                ),
              },
              {
                key: "Promote",
                label: (
                  <Button
                    type={ButtonType.TEXT}
                    style={{ color: "#FFA500" }}
                    block
                    onClick={() => onPromote(record)}
                    icon={<PiChartLineUpBold />}
                  >
                    {t("promote")}
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
                    icon={<DeleteOutlined />}
                  >
                    {t("remove")}
                  </Button>
                ),
              },
            ],
          }}
          trigger={["click"]}
        >
          <Button block type={ButtonType.TEXT} icon={<MoreOutlined />} />
        </Dropdown>
      ),
      fixed: "right",
      align: "center",
      width: 30,
    }),
  ];
}
