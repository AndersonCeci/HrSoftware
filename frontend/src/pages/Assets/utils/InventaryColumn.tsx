import { InventaryDataType } from "../types/InventaryDataType";
import { createTableColumns } from "../../../components/Table/Table";
import { ConfigProvider, Progress, Typography } from "antd";
import { TableProps } from "antd";
import { useTranslation } from "react-i18next";

type InventaryColumnType = (
  data: InventaryDataType[],
  onEdit: (id: string, value: number) => void,
) => TableProps<InventaryDataType>["columns"];

function calcPercantage(reserved: number, quantity: number) {
  return parseFloat(((reserved / quantity) * 100).toFixed(1));
}

const createColumns: InventaryColumnType = (data, onEdit) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation();
  return [
    createTableColumns({
      title: t("assetType"),
      dataIndex: "assetType",
      key: "assetType",
    }),
    createTableColumns({
      title: t("available"),
      dataIndex: "reserved",
      key: "reserved",
      displayAs: (value, record) => {
        const percentage = calcPercantage(
          record.quantity - record.reserved,
          record.quantity,
        );
        const available = record.quantity - record.reserved;
        return (
          <ConfigProvider
            theme={{
              components: {
                Progress: {
                  defaultColor: "#2A9BE6",
                },
              },
            }}
          >
            <Progress
              percentPosition={{ align: "end", type: "inner" }}
              format={(percent) =>
                `${available} ${percent && percent > 20 ? "Available" : ""}`
              }
              size={["100%", 20]}
              percent={percentage}
              status={
                percentage > 80
                  ? "success"
                  : percentage <= 30
                    ? "exception"
                    : "normal"
              }
            />
          </ConfigProvider>
        );
      },
      width: "40%",
    }),
    createTableColumns({
      title: t("reserved"),
      dataIndex: "reserved",
      key: "reserved",
      width: 10,
    }),
    createTableColumns({
      title: t("totalQuantity"),
      dataIndex: "quantity",
      key: "quantity",
      displayAs: (value) => {
        return <Typography.Text> {value} </Typography.Text>;
      },
      align: "center",
    }),
  ];
};

export default createColumns;
