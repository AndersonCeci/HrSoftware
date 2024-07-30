import React, { useState } from "react";
import { Button, Modal, Space, TableProps } from "antd";
import Table, { createTableColumns, getAllUniqueValues } from "../../../components/Table/Table";
import { RequestedDataType } from "../../../types/RequestedLeave";
import TableHeader from "../../../components/Table/TableHeader";
import Drawer from "../../../components/Shared/Drawer";
import RequestForm from "../../DayOff/components/RequestForm";

export interface RequestedTableProps {
  data?: RequestedDataType[];
  onAdd?: (newRequest: RequestedDataType) => void;
}

const RequestedTable: React.FC<RequestedTableProps> = () => {
  const [data, setData] = useState<RequestedDataType[]>([]);
  const [open, setOpen] = useState(false);
  const [approvedId, setApprovedId] = useState<string[]>([]);

  function handleModalClose() {
    setOpen(false);
  }

  function handleApprove(id: string) {
      setApprovedId((prevApprovedId) => [...prevApprovedId, id]);
  }

  const onDecline = (record:RequestedDataType) => {
    console.log(record, 'recorddd')
    Modal.confirm({
      title: "Are you sure you wanna decline?",
      okText:"Yes",
      okType:"danger",
      onOk: () =>{
        setData((prev) => prev.filter((item) => item.id !== record.id))
      }
    })
    // setData((prevData) => prevData.filter((item) => item.id !== record.id))
  }

  function handleAddNewRequest(newRequest: RequestedDataType) {
    setData((prev) => [...prev, newRequest])
    setOpen(false)
  }

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
      filters: getAllUniqueValues(data, "leaveType"),
      onFilter: (value, record) => record.leaveType.indexOf(value) === 0,
    }),
    createTableColumns({
      title: "Leave From",
      dataIndex: "leaveFrom",
      key: "leaveFrom",
    }),
    createTableColumns({
      title: "Leave To",
      dataIndex: "leaveTo",
      key: "leaveTo",
    }),
    createTableColumns({
      title: "Reason",
      dataIndex:"reason",
      key: "reason"
    }),
    createTableColumns({
      title: "Action",
      dataIndex: "action",
      key: "action",
      displayAs: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => handleApprove(record.id)}
            style={{
              background: approvedId.includes(record.id) ? "green" : "#246AFE",
              color: "white"
            }}
            disabled={approvedId.includes(record.id)}
            ghost
          >
            {approvedId.includes(record.id) ? "Approved" : "Approve"}
          </Button>
          <Button
            onClick={() => onDecline(record)}
            style={{ background: "none", color: "red", border: "0" }}
            ghost
          >
            Decline
          </Button>
        </Space>
      ),
    }),
  ];

  return (
    <>
      <Drawer placement="right" isOpen={open} onClose={handleModalClose}>
        <RequestForm onAdd={handleAddNewRequest} />
      </Drawer>
      <TableHeader title={"Requested Leave"} onClick={() => setOpen(true)} />
      <Table columns={columns} data={data} />
    </>
  );
};

export default RequestedTable;
