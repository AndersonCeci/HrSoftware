import Table, { getAllUniqueValues } from "../../../components/Table/Table";
import TableHeader from "../../../components/Table/TableHeader";
import Modal from "../../../components/Shared/Modal";
import AddAssetForm from "./AddAssetForm";
import EditAssetForm from "./EditAssetForm";
import { AssetDatatype } from "../types/AssetsDataType";

import { useState, useEffect, useRef } from "react";
import { HTTP } from "../Enum/http";

import { getColumns } from "../utils/AssetsColumn";

const AssetContent = () => {
	const [tableData, setTableData] = useState<AssetDatatype[]>([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isEditModalVisible, setIsEditModalVisible] = useState(false);
	const formRef = useRef<any>();
	const editFormRef = useRef<any>();
	const [selectedElement, setSelectedElement] = useState<AssetDatatype | undefined>(undefined);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch(HTTP.GETASSET);
				if (!response.ok) {
					throw new Error("Failed to fetch assets");
				}
				const data = await response.json();
				setTableData(data);
			} catch (error) {
				console.error(error);
			}
		}
		fetchData();
	}, []);

	function handleDataDelete(id: string) {
		// setTableData((prev) => prev.filter((item) => item.id !== id));
		console.log(id);
		console.log(
			"RECORD",
			tableData.filter((item) => item._id !== id),
		);
		async function handleAssetDelete(id: string) {
			try {
				const response = await fetch(`${HTTP.DELETEASSET}/${id}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
					// body: JSON.stringify({ id }),
				});
				if (!response.ok) {
					throw new Error("Failed to delete asset");
				}
			} catch (error) {
				console.error(error);
			}

			setTableData((prev) => prev.filter((item) => item._id !== id));
		}

		handleAssetDelete(id);
	}

	function handleStartEditing(id: string) {
		const newElement = tableData.find((item) => item._id === id);
		console.log("Handle start edit", newElement);
		setSelectedElement(newElement);
		setIsEditModalVisible(true);
	}

	function handleAssetEdit(newAsset: AssetDatatype) {
		setTableData((prev) => {
			const newTableData = prev.map((item) => {
				if (item._id === newAsset._id) {
					return newAsset;
				}
				return item;
			});
			return newTableData;
		});
		setIsEditModalVisible(false);
	}

	const allAssetTypes = getAllUniqueValues(tableData, "type").map((option) => ({
		value: option.text,
		label: option.text,
	}));

	const allEmployees = getAllUniqueValues(tableData, "employee").map((option) => ({
		value: option.text,
		label: option.text,
	}));

	const columns = getColumns(tableData, handleDataDelete, handleStartEditing);

	return (
		<section className="test">
			<Modal
				isOpen={isEditModalVisible}
				onCancel={() => {
					setIsEditModalVisible(false);
				}}
				onOk={() => {
					editFormRef.current.submit();
				}}
			>
				<EditAssetForm
					ref={editFormRef}
					selectedElement={selectedElement}
					availableOptions={allAssetTypes}
					availableEmployees={allEmployees}
					onSuccess={handleAssetEdit}
				/>
			</Modal>
			<Modal
				isOpen={isModalVisible}
				onCancel={() => {
					setIsModalVisible(false);
				}}
				onOk={() => {
					formRef.current.submit();
				}}
			>
				<AddAssetForm
					ref={formRef}
					availableOptions={allAssetTypes}
					availableEmployees={allEmployees}
					onSuccess={(newAsset) => {
						setIsModalVisible(false);
						setTableData((prev) => [...prev, newAsset]);
					}}
				/>
			</Modal>
			<TableHeader
				title="Assets"
				onClick={() => {
					setIsModalVisible(true);
				}}
			/>
			<Table columns={columns} data={tableData} />
		</section>
	);
};

export default AssetContent;
