import { Flex } from "antd";
import Table from "../../../components/Table/Table";
import "../styles/styles.css";
import { expandedColumns } from "./columns/ExpandesColumns";
import Button from "../../../components/Shared/Button";
import Modal from "../../../components/Shared/Modal";
import AssetForm from "./AssetForm";
import { useState, useRef } from "react";
import useHttp from "../../../hooks/useHttp";

import { AssetDatatype, InventaryDataType } from "../types/AssetsDataType";
type ExpandedRowProps = {
	record: AssetDatatype;
};

const INVENTARY_API = import.meta.env.REACT_APP_INVENTARY_API;

const ExpandedRow = ({ record }: ExpandedRowProps) => {
	const [showInitialData, setShowInitialData] = useState(10);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [inventaryData, setInventaryData] = useState<InventaryDataType[]>(record.inventories);
	const [selectedAsset, setSelectedAsset] = useState<InventaryDataType | null>(null);
	const formRef = useRef<any>();
	const { quantity } = record;
	const [, , fetchData] = useHttp();

	const handleOnRepairClick = (newStatus: string, updatedRecord: InventaryDataType) => {
		console.log(newStatus, "HELLO Mom", updatedRecord);
		fetchData(
			useHttp.patchRequestHelper(`${INVENTARY_API}/${updatedRecord._id}`, {
				assetName: record.assetName,
				assetCodes: updatedRecord.assetCodes,
				status: newStatus,
			}),
			(response) => {
				console.log(response, "response");
				setInventaryData((prev) => {
					console.log(response, "response");
					return prev.map((item) => (item._id === updatedRecord._id ? response : item));
				});
			},
		);
	};

	const handleOnAdd = (dataToSubmit: { employeeID: string; dateGiven: string }) => {
		fetchData(
			useHttp.patchRequestHelper(`${INVENTARY_API}/assign/${selectedAsset?._id}`, dataToSubmit),
			(response) => {
				setInventaryData((prev) =>
					prev.map((item) => (item._id === response._id ? response : item)),
				);
			},
		);
	};

	function handleDeleteFromInventary(id: string) {
		fetchData(useHttp.deleteRequestHelper(`${INVENTARY_API}/${id}`), () => {
			setInventaryData((prev) => prev.filter((item) => item._id !== id));
		});
	}

	const handleAddAsset = (record: InventaryDataType) => {
		setIsModalOpen(true);
		setSelectedAsset(record);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	const handleSubmit = () => {
		formRef.current.submit();
		setSelectedAsset(null);
		setIsModalOpen(false);
	};

	const handleShowMore = () => {
		setShowInitialData((prev) => prev + 10);
	};

	const columns = expandedColumns(
		inventaryData,
		handleOnRepairClick,
		handleAddAsset,
		handleDeleteFromInventary,
	);
	return (
		<Flex vertical align="center" className="inner-table-container test">
			<Modal isOpen={isModalOpen} onCancel={handleModalClose} onOk={handleSubmit}>
				<AssetForm onAdd={handleOnAdd} selectedElement={selectedAsset} ref={formRef} />
			</Modal>
			<Table
				pagination={false}
				data={inventaryData}
				columns={columns}
				rowClassName="inner-table-row"
				// showHeader={false}
			/>
			<Button type="link" disabled={quantity <= showInitialData} onClick={handleShowMore}>
				{quantity > showInitialData ? "Show More" : "No More Data"}
			</Button>
		</Flex>
	);
};

export default ExpandedRow;
