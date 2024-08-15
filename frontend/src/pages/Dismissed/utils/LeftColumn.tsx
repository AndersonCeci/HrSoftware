import { TableProps } from "antd";
import { LeftDataType } from "../types/Left";
import {
  createTableColumns,
  getAllUniqueValues,
} from "../../../components/Table/Table";
import { SearchOutlined } from "@ant-design/icons";
import { capitalizeFirstLetter } from "../../../utils/paths";
import { useTranslation } from "react-i18next";

export function getColumns(
  tableData: LeftDataType[],
): TableProps<LeftDataType>["columns"] {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation();
  return [
    createTableColumns({
      title: t("name"),
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

    createTableColumns({
      title: t("phoneNumber"),
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    }),
    createTableColumns({
      title: t("position"),
      dataIndex: "position",
      key: "position",
      filters: getAllUniqueValues(tableData, "position"),
      onFilter: (value, record) => record.position.indexOf(value) === 0,
    }),
    createTableColumns({
      title: t("salary"),
      dataIndex: "salary",
      key: "salary",
      displayAs: (value) => {
        return <span>{value} €</span>;
      },
    }),
    createTableColumns({
      title: t("startingOn"),
      dataIndex: "startingDate",
      key: "startDate",
    }),
    createTableColumns({
      title: t("leftDate"),
      dataIndex: "deletedAt",
      key: "deletedAt",
    }),
  ];
}
