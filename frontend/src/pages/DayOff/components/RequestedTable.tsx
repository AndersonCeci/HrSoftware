import { Button, Flex, Modal, Space, TableProps } from "antd";
import Table, {
  createTableColumns,
  getAllUniqueValues,
} from "../../../components/Table/Table";
import { useEffect, useState } from "react";
import { RequestedDataType } from "../../../types/RequestedLeave";
import DummyRequestedData from "../../../utils/dummyrequestedleave";
import TableHeader from "../../../components/Table/TableHeader";
import Drawer from "../../../components/Shared/Drawer";
import RequestForm from "../../DayOff/components/RequestForm";
import TextArea from "antd/es/input/TextArea";

const RequestedTable: React.FC = () => {
  const [tableData, setTableData] = useState<RequestedDataType[]>([]);
  const [open, setOpen] = useState(false);

  function handleModalClose() {
    setOpen(false);
  }

  useEffect(() => {
    setTableData(DummyRequestedData);
  }, []);

  const columns: TableProps<RequestedDataType>["columns"] = [
    createTableColumns({
      title: "Name",
      dataIndex: "name",
      key: "name",
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
    createTableColumns({
      title: "Action",
      dataIndex: "action",
      key: "action",
      displayAs: () => (
        <Space size="middle">
          <Button style={{ background: "#246AFE", color: "white" }} ghost>
            Approve
          </Button>
          <Button
            onClick={() => {
              onDecline();
            }}
            style={{ background: "none", color: "red", border: "0" }}
            ghost
          >
            Decline
          </Button>
        </Space>
      ),
    }),
  ];

  const onDecline = () => {
    Modal.confirm({
      title: "Please give a reason for decline",
      content: <TextArea rows={4} placeholder="Reason here" />,
    });
  };

  return (
    <section className="test">
      <Flex vertical>
        <Drawer placement="right" isOpen={open} onClose={handleModalClose}>
          <RequestForm />
        </Drawer>
        <TableHeader title={"Requested Leave"} onClick={() => setOpen(true)} />
        <Table pageSize={4} columns={columns} data={tableData} />
      </Flex>
    </section>
  );
};

export default RequestedTable;
