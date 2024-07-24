import { Flex, TableProps } from "antd";
import Table, {
  createTableColumns,
  getAllUniqueValues,
} from "../../../components/Table/Table";
import { useEffect, useState } from "react";
import { RequestedDataType } from "../../../types/RequestedLeave";
import DummyRequestedData from "../../../utils/dummyrequestedleave";
import { SearchOutlined } from "@ant-design/icons";

const LeaveTable: React.FC = () => {
  const [tableData, setTableData] = useState<RequestedDataType[]>([]);

  useEffect(() => {
    setTableData(DummyRequestedData);
  }, []);

  const columns: TableProps<RequestedDataType>["columns"] = [
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
      title: "Leave Type",
      dataIndex: "leaveType",
      key: "leaveType",
      filters: getAllUniqueValues(tableData, "leaveType"),
      onFilter: (value, record) => record.position.indexOf(value) === 0,
    }),
    createTableColumns({
      title: "Start Date",
      dataIndex: "startingDate",
      key: "startingDate",
    }),
    createTableColumns({
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    }),
  ];

  return (
    <section style={{marginTop: 0}} className="test">
      <Flex vertical>
        <h1>On Leave</h1>
        <Table pageSize={4} columns={columns} data={tableData} />
      </Flex>
    </section>
  );
};

export default LeaveTable;
