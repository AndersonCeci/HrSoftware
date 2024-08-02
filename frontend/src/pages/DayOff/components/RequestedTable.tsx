import { useEffect, useState } from "react";
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
	const [, , fetchData] = useHttp();
	const [selectedRecord, setSelectedRecord] = useState<RequestedDataType | undefined>(undefined);

	function handleDrawerClose() {
		setisDrawerOpen(false);
	}

	function handleApprove(id: string) {
		fetchData(
			{
				url: `${API}/${id}/approve`,
				method: "PATCH",
			},
			() => {
				console.log("id", id, "was approved");
				setData((prev) =>
					prev.map((item) => {
						if (item._id === id) {
							return { ...item, isApproved: true };
						}
						return item;
					}),
				);
			},
		);
	}

	useEffect(() => {
		fetchData({ url: API }, (data) => {
			setData(data);
		});
	}, []);

	function handleDecline(id?: string) {
		fetchData(
			{
				url: `${API}/${id}/soft-delete`,
				method: "DELETE",
			},
			() => {
				console.log("id", id, "was deleted");
				setData((prev) => prev.filter((item) => item._id !== id));
			},
		);
	}

	const onDecline = (record: RequestedDataType) => {
		setIsModalOpen(true);
		console.log("record", record);
		setSelectedRecord(record);
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
	);

	return (
		<>
			<Drawer
				placement="right"
				title={"Leave Request Form"}
				isOpen={isDrawerOpen}
				onClose={handleDrawerClose}
			>
				<RequestForm onAdd={handleAddNewRequest} />
			</Drawer>
			<Modal
				isOpen={isModalOpen}
				onCancel={() => setIsModalOpen(false)}
				onOk={() => {
					handleDecline(selectedRecord?._id);
					setIsModalOpen(false);
				}}
				title={"Delete Request"}
			>
				<p>Are you sure you want to decline this request? made by {selectedRecord?.EmployeeName}</p>
			</Modal>
			<TableHeader title={"Requested Leave"} onClick={() => setisDrawerOpen(true)} />
			<Table columns={columns} data={data} />
		</>
	);
};

export default RequestedTable;
