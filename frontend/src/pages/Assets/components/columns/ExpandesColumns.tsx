import { Tag, Typography, Dropdown } from "antd";
import { AssetStatus } from "../../types/AssetsDataType";
import {
  createTableColumns,
  getAllUniqueValues,
} from "../../../../components/Table/Table";
import Button from "../../../../components/Shared/Button";
import { InventaryDataType } from "../../types/AssetsDataType";
import { getFullName } from "../../../../utils/utils";
import {
  DeleteOutlined,
  MoreOutlined,
  SearchOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { FaRegCheckCircle } from "react-icons/fa";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { BsFillPersonDashFill } from "react-icons/bs";

export function expandedColumns(
  inventaryData: InventaryDataType[],
  onChangeStatus: (newStatus: AssetStatus, record: InventaryDataType) => void,
  onAddAsset: (record: InventaryDataType) => void,
  handleUnassign: (record: InventaryDataType) => void,
  onDeleteAsset: (id: InventaryDataType) => void,
) {
  return [
    createTableColumns({
      title: "Code",
      dataIndex: "assetCodes",
      key: "code",
      filterDropdown: true,
      filterIcon: <SearchOutlined className="nav-menu-icon" />,
      onFilter(value, record) {
        return record.assetCodes.includes(value);
      },
    }),
    createTableColumns({
      title: "Employee Name",
      dataIndex: "_id",
      key: "userName",
      displayAs: (_: string, record: InventaryDataType) => {
        const employee = record.employeeDetails;
        return (
          <Typography.Text>
            {employee !== undefined
              ? getFullName(employee.name, employee.surname)
              : " Not Assigned"}
          </Typography.Text>
        );
      },
    }),
    createTableColumns({
      title: "Date",
      dataIndex: "assignDate",
      key: "dateGiven",
      displayAs: (text: string) => {
        return (
          <Typography.Text>
            {text ? new Date(text).toLocaleDateString() : "Not assigned"}
          </Typography.Text>
        );
      },
    }),
    createTableColumns({
      title: "Status",
      dataIndex: "status",
      key: "status",
      displayAs: (_, record) => {
        const isAvailable = record.status === AssetStatus.Available;
        const isOnRepair = record.status === AssetStatus.OnRepair;
        return (
          <Tag color={isAvailable ? "success" : isOnRepair ? "warning" : "red"}>
            {record.status}
          </Tag>
        );
      },
      align: "center",
      width: 20,
      filters: getAllUniqueValues(inventaryData, "status"),
      onFilter: (value, record) => {
        return record.status.includes(value as string);
      },
    }),
    createTableColumns({
      title: "Date of Purchase",
      dataIndex: "createdAt",
      key: "assetName",
      displayAs: (text) => {
        const date = new Date(text);
        return <Typography.Text>{date.toLocaleDateString()}</Typography.Text>;
      },
    }),
    createTableColumns({
      title: "Actions",
      dataIndex: "_id",
      key: "actions",
      displayAs: (_, record) => {
        const { status } = record;
        const isAvailable = status === "Available";
        const isOnRepair = status === "OnRepair";

        return (
          <Dropdown
            menu={{
              items: [
                !isOnRepair
                  ? {
                      key: "Assign",
                      label: (
                        <Button
                          type="text"
                          size="large"
                          block
                          icon={
                            isAvailable ? (
                              <BsFillPersonCheckFill />
                            ) : (
                              <BsFillPersonDashFill />
                            )
                          }
                          iconPosition="end"
                          onClick={
                            isAvailable
                              ? () => onAddAsset(record)
                              : () => handleUnassign(record)
                          }
                        >
                          {isAvailable ? "Assign" : "Unassign"}
                        </Button>
                      ),
                    }
                  : null,
                {
                  key: "Repair",
                  label: (
                    <Button
                      type="text"
                      size="large"
                      icon={
                        isOnRepair ? <FaRegCheckCircle /> : <ToolOutlined />
                      }
                      style={{ color: isOnRepair ? "green" : "orange" }}
                      block
                      onClick={() =>
                        onChangeStatus(
                          isOnRepair
                            ? AssetStatus.Available
                            : AssetStatus.OnRepair,
                          record,
                        )
                      }
                      iconPosition="end"
                    >
                      {!isOnRepair ? "Repair" : "Repaired"}
                    </Button>
                  ),
                },
                {
                  key: "Delete",
                  label: (
                    <Button
                      type="text"
                      size="large"
                      danger
                      icon={<DeleteOutlined />}
                      block
                      onClick={() => onDeleteAsset(record)}
                      iconPosition="end"
                    >
                      Delete
                    </Button>
                  ),
                },
              ],
            }}
            arrow
            placement="bottom"
            trigger={["click"]}
          >
            <Button type="text" block icon={<MoreOutlined />} />
          </Dropdown>
        );
      },
      align: "center",
      width: 20,
    }),
  ];
}
