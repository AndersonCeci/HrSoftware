import {
  createTableColumns,
  getAllUniqueValues,
} from "../../../components/Table/Table";
import {
  MoreOutlined,
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Button from "../../../components/Shared/Button";
import { TableProps, Dropdown } from "antd";
import { ButtonType } from "../../../enums/Button";
import { AssetDatatype } from "../types/AssetsDataType";
import { useTranslation } from "react-i18next";

export function getColumns(
  tableData: AssetDatatype[],
  handleDataDelete: (id: string) => void,
  handleDataEdit: (id: string) => void,
): TableProps<AssetDatatype>["columns"] {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation();
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
    }),
    createTableColumns({
      title: t("type"),
      dataIndex: "assetType",
      key: "type",
      width: 150,
      filters: getAllUniqueValues(tableData, "assetType"),
      onFilter: (value, record) => record.assetType.indexOf(value) === 0,
    }),
    createTableColumns({
      title: t("date"),
      dataIndex: "dateGiven",
      key: "date",
      width: 150,
      displayAs: (value) => <span>{new Date(value).toLocaleDateString()}</span>,
    }),
    createTableColumns({
      title: t("Code"),
      dataIndex: "assetCode",
      key: "code",
      width: 150,
    }),
    createTableColumns({
      title: t("action"),
      dataIndex: "_id",
      key: "action",
      displayAs: (record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "Edit",
                label: (
                  <Button
                    type={ButtonType.TEXT}
                    onClick={() => {
                      handleDataEdit(record);
                      console.log(record);
                    }}
                    // size={ButtonSize.LARGE}
                    icon={<EditOutlined />}
                    block
                  >
                    {t("edit")}
                  </Button>
                ),
              },
              {
                key: "Delete",
                label: (
                  <Button
                    type={ButtonType.TEXT}
                    // size={ButtonSize.LARGE}
                    onClick={() => handleDataDelete(record)}
                    danger
                    icon={<DeleteOutlined />}
                    block
                  >
                    {t("delete")}
                  </Button>
                ),
              },
            ],
          }}
          trigger={["click"]}
        >
          <Button type={ButtonType.TEXT} block icon={<MoreOutlined />} />
        </Dropdown>
      ),
      fixed: "right",
      align: "center",
      width: 20,
    }),
  ];
}
