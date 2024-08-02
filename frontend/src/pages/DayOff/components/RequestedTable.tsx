import React, { useEffect, useState } from "react";
import { Modal, TableProps } from "antd";
import Table from "../../../components/Table/Table";
import { RequestedDataType } from "../types/RequestedLeave";
import TableHeader from "../../../components/Table/TableHeader";
import Drawer from "../../../components/Shared/Drawer";
import RequestForm from "../../DayOff/components/RequestForm";
import { createColumns } from "../utils/tableColumns";
import useHttp from "../../../hooks/useHttp";

export interface RequestedTableProps {
	data?: RequestedDataType[];
	onAdd?: (newRequest: RequestedDataType) => void;
}

const API = import.meta.env.REACT_APP_DAYOFF_API;

const RequestedTable: React.FC<RequestedTableProps> = () => {
	const [data, setData] = useState<RequestedDataType[]>([]);
	const [open, setOpen] = useState(false);
	const [loading, error, fetchData] = useHttp();
	const [approvedId, setApprovedId] = useState<string[]>([]);

	function handleModalClose() {
		setOpen(false);
	}

	useEffect(() => {
		fetchData({ url: API }, (data) => {
			setData(data);
		});
	}, []);

	function handleApprove(id: string) {
		setApprovedId((prevApprovedId) => [...prevApprovedId, id]);
	}

	const onDecline = (record: RequestedDataType) => {
		console.log(record, "record");
		Modal.confirm({
			title: "Are you sure you wanna decline?",
			okText: "Yes",
			okType: "danger",
			onOk: () => {
				setData((prev) => prev.filter((item) => item._id !== record._id));
			},
		});
		// setData((prevData) => prevData.filter((item) => item.id !== record.id))
	};

	function handleAddNewRequest(newRequest: RequestedDataType) {
		fetchData(
			{
				url: API,
				method: "POST",
				body: newRequest,
			},
			() => {
				setData((prev) => [...prev, newRequest]);
				setOpen(false);
			},
		);
	}

	const columns: TableProps<RequestedDataType>["columns"] = createColumns(
		data,
		handleApprove,
		onDecline,
		approvedId,
	);

	return (
		<>
			<Drawer
				placement="right"
				title={"Leave Request Form"}
				isOpen={open}
				onClose={handleModalClose}
			>
				<RequestForm onAdd={handleAddNewRequest} />
			</Drawer>
			<TableHeader title={"Requested Leave"} onClick={() => setOpen(true)} />
			<Table columns={columns} data={data} />
		</>
	);
};

export default RequestedTable;
