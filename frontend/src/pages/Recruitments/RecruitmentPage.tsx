import Table from "../../components/Table/Table";
import { columns as generateColumns } from "./columns/columns";
import TableHeader from "../../components/Table/TableHeader";

import { RecrutmentDataType } from "./types/RecruitmentDataTypes";
import { useEffect, useState, useRef } from "react";
import TableModal from "./components/TableModal";
import { useTranslation } from "react-i18next";
import useHttp from "../../hooks/useHttp";
import Modal from "../../components/Shared/Modal";

const API = import.meta.env.REACT_APP_RECRUITMENT_API;

const RecruitmentPage: React.FC = () => {
	const { t } = useTranslation();
	const [tableData, setTableData] = useState<RecrutmentDataType[]>([]);
	const [editingRecord, setEditingRecord] = useState<RecrutmentDataType | null>(null);
	const [isLoading, error, sendRequest] = useHttp();
	const formRef = useRef<any>();
	const [isEditModalVisible, setIsEditModalVisible] = useState(false);

	useEffect(() => {
		sendRequest({ url: API }, (data) => {
			setTableData(data);
		});
	}, []);

	function handleDelete(id: string) {
		sendRequest(useHttp.deleteRequestHelper(`${API}/${id}`));
		setTableData((prevData) => prevData.filter((item: RecrutmentDataType) => item._id !== id));
	}

	function handleAddNew(newData: RecrutmentDataType) {
		setTableData((prevData) => [...prevData, newData]);
		setIsEditModalVisible(false);
	}

	function handleEdit(newData: RecrutmentDataType) {
		setTableData((prevData) => prevData.map((item) => (item._id === newData._id ? newData : item)));
		setIsEditModalVisible(false);
	}

	const columns = generateColumns({
		tableData,
		handleEdit: (record: RecrutmentDataType) => handleEditButtonClick(record),
		handleDelete: handleDelete,
	});

	const handleEditButtonClick = (record: RecrutmentDataType) => {
		setEditingRecord(record);
		setIsEditModalVisible(true);
	};

	//! const handleDelete = async (id: string) => {
	//! 	try {
	//! 		const response = await fetch(`http://localhost:3000/recruiments/${id}`, {
	//! 			method: "DELETE",
	//! 			headers: {
	//! 				"Content-Type": "application/json",
	//! 			},
	//! 		});

	//! 		if (!response.ok) {
	//! 			throw new Error(`HTTP error! status: ${response.status}`);
	//! 		}

	//! 		setTableData((prevData) => prevData.filter((item: RecrutmentDataType) => item._id !== id));
	//! 	} catch (error) {
	//! 		console.error("Error deleting recruitment:", error);
	//! 	}
	//! 	console.log("delete", id);

	//! };

	// const handleSubmit = async (values: RecrutmentDataType) => {
	// 	try {
	// 		const url = editingRecord
	// 			? `http://localhost:3000/recruiments/${editingRecord._id}`
	// 			: "http://localhost:3000/recruiments";
	// 		const method = editingRecord ? "PATCH" : "POST";
	// 		console.log(method, "methodd");
	// 		const response = await fetch(url, {
	// 			method: method,
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify(values),
	// 		});

	// 		if (response.ok) {
	// 			const newData = await response.json();
	// 			setTableData((prevData) =>
	// 				editingRecord
	// 					? prevData.map((item) => (item._id === editingRecord._id ? newData : item))
	// 					: [...prevData, newData],
	// 			);
	// 		} else {
	// 			console.error(`Failed to ${editingRecord ? "update" : "create"} recruitment`);
	// 		}
	// 	} finally {
	// 		setIsEditModalVisible(false);
	// 		setEditingRecord(null);
	// 	}
	// };

	const handleOnClose = () => {
		setIsEditModalVisible(false);
		setEditingRecord(null);
	};

	return (
		<section className="test">
			<Modal
				isOpen={isEditModalVisible}
				onCancel={handleOnClose}
				onOk={() => {
					formRef.current?.submit();
				}}
			>
				<TableModal
					ref={formRef}
					selectedRecord={editingRecord}
					onAdd={handleAddNew}
					onEdit={handleEdit}
				/>
			</Modal>
			<TableHeader title={t("recruitmentTitle")} onClick={() => setIsEditModalVisible(true)} />
			{!isLoading ? <Table columns={columns} data={tableData} fixed /> : <h1>Loading...</h1>}
		</section>
	);
};

export default RecruitmentPage;
