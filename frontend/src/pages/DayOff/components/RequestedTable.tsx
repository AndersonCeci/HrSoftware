import React, { useEffect, useState } from "react";
import { TableProps } from "antd";
import Modal from "../../../components/Shared/Modal";
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

const RequestedTable = () => {
	const [data, setData] = useState<RequestedDataType[]>([]);
	const [isDrawerOpen, setisDrawerOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [loading, error, fetchData] = useHttp();
	const [approvedId, setApprovedId] = useState<string[]>([]);
	function handleModalClose() {
		setisDrawerOpen(false);
	}

	useEffect(() => {
		fetchData({ url: API }, (data) => {
			setData(data);
		});
	}, []);

	function handleApprove(id: string) {
		setApprovedId((prevApprovedId) => [...prevApprovedId, id]);
	}

	function handleDecline(id: string) {
		fetchData(
			{
				url: `${API}/${id}`,
				method: "DELETE",
			},
			() => {
				setData((prev) => prev.filter((item) => item._id !== id));
			},
		);
	}

	const onDecline = (record: RequestedDataType) => {
		console.log(record, "record");
		setIsModalOpen(true);
		// setData((prevData) => prevData.filter((item) => item.id !== record.id))
	};

	function handleAddNew(data: RequestedDataType) {
		console.log("data", data);
		setData((prev) => [...prev, data]);
	}

	function handleAddNewRequest(newRequest: RequestedDataType) {
		console.log("RRERERER", newRequest);
		fetchData(
			{
				url: API,
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: newRequest,
			},
			(response) => {
				handleAddNew(response);
				setisDrawerOpen(false);
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
				isOpen={isDrawerOpen}
				onClose={handleModalClose}
			>
				<RequestForm onAdd={handleAddNewRequest} />
			</Drawer>
			<Modal
				isOpen={isModalOpen}
				onCancel={() => setIsModalOpen(false)}
				// onOk={}
				title={"Delete Request"}
			>
				<p>Are you sure you want to delete this request?</p>
			</Modal>
			<TableHeader title={"Requested Leave"} onClick={() => setisDrawerOpen(true)} />
			<Table columns={columns} data={data} />
		</>
	);
};

export default RequestedTable;
