import { Flex, Typography } from "antd";
import Table from "../../../components/Table/Table";
import "../styles/styles.css";
import { expandedColumns } from "./columns/ExpandesColumns";
import Modal from "../../../components/Shared/Modal";
import AssetForm from "./AssetForm";
import { useState, useRef, useContext } from "react";
import { AssetInventaryContext } from "../context/AssetInventaryContext";
import useHttp from "../../../hooks/useHttp";

import { AssetDatatype, InventaryDataType, AssetStatus } from "../types/AssetsDataType";
import Button from "../../../components/Shared/Button";

const INVENTARY_API = import.meta.env.REACT_APP_INVENTARY_API;

const ExpandedRow = ({ record }: { record: AssetDatatype }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { updateInventaryItemHandler, deleteFromInventaryHandler } =
		useContext(AssetInventaryContext);
	const [selectedAsset, setSelectedAsset] = useState<InventaryDataType | null>(null);
	const formRef = useRef<any>();
	const [, , fetchData] = useHttp();

	const handleOnRepairClick = (newStatus: string, updatedRecord: InventaryDataType) => {
		fetchData(
			useHttp.patchRequestHelper(`${INVENTARY_API}/${updatedRecord._id}`, {
				assetName: record.assetName,
				assetCodes: updatedRecord.assetCodes,
				status: newStatus,
			}),
			(response) => {
				updateInventaryItemHandler(response, {
					onRepairModifier: response.status === AssetStatus.OnRepair ? 1 : -1,
					reservedModifier: 0,
				});
			},
		);
	};

	const filterData = record.inventories;

	const handleOnAssign = (dataToSubmit: {
		employeeID: string | undefined;
		dateGiven: string | undefined;
	}) => {
		fetchData(
			useHttp.patchRequestHelper(`${INVENTARY_API}/assign/${selectedAsset?._id}`, dataToSubmit),
			(response) => {
				updateInventaryItemHandler(response, {
					onRepairModifier: 0,
					reservedModifier: response.status === AssetStatus.Assigned ? 1 : -1,
				});
			},
		);
	};

	function handleDeleteFromInventary(deletedInventary: InventaryDataType) {
		fetchData(useHttp.deleteRequestHelper(`${INVENTARY_API}/${deletedInventary._id}`), () => {
			deleteFromInventaryHandler(deletedInventary);
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

	const columns = expandedColumns(
		record.inventories,
		handleOnRepairClick,
		handleAddAsset,
		handleDeleteFromInventary,
	);

	return (
		<Flex vertical align="center" className="inner-table-container test">
			<Modal isOpen={isModalOpen} onCancel={handleModalClose} onOk={handleSubmit}>
				<AssetForm onAdd={handleOnAssign} selectedElement={selectedAsset} ref={formRef} />
			</Modal>
			<Typography.Text>{`View info about Laptop ${record.assetName}`}</Typography.Text>
			<Table
				pagination={false}
				data={filterData}
				columns={columns}
				rowClassName="inner-table-row"
			/>
			{/* <Button type="link">Scroll To Top</Button> */}
		</Flex>
	);
};

export default ExpandedRow;
