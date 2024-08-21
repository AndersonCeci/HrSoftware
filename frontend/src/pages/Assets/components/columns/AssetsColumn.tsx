import {
  createTableColumns,
  getAllUniqueValues,
} from "../../../../components/Table/Table";
import { SearchOutlined } from "@ant-design/icons";
import { TableProps } from "antd";
import { AssetDatatype } from "../../types/AssetsDataType";

export function getColumns(
  tableData: AssetDatatype[],
): TableProps<AssetDatatype>["columns"] {
  return [
    createTableColumns({
      title: "Employee",
      dataIndex: "userName",
      key: "employee",
      filterDropdown: true,
      filterIcon: <SearchOutlined className="nav-menu-icon" />,
      width: 150,
      onFilter: (inputValue, filter) =>
        filter.userName.toLowerCase().includes(inputValue.toLowerCase()),
    }),
    createTableColumns({
      title: "Type",
      dataIndex: "assetType",
      key: "type",
      width: 150,
      filters: getAllUniqueValues(tableData, "assetType"),
      onFilter: (value, record) => record.assetType.indexOf(value) === 0,
    }),
    createTableColumns({
      title: "Date",
      dataIndex: "dateGiven",
      key: "date",
      width: 150,
      displayAs: (value) => <span>{new Date(value).toLocaleDateString()}</span>,
    }),
    createTableColumns({
      title: "Code",
      dataIndex: "assetCode",
      key: "code",
      width: 150,
    }),
  ];
}
