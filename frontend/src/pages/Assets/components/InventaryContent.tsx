import Table from "../../../components/Table/Table";
import TableHeader from "../../../components/Table/TableHeader";
import createColumns from "../utils/InventaryColumn";
import { dummyData, dummyAssets } from "../utils/inventaryDummy";
import { useState, useEffect, useRef } from "react";
import useHttp from "../../../hooks/useHttp";
import { InventaryDataType } from "../types/InventaryDataType";
import Modal from "../../../components/Shared/Modal";
import QuantityForm from "./InventaryForm";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import ExpandedRow from "./ExpandesRow";

const InventaryContent = () => {
	const [inventaryData, setInventaryData] = useState<InventaryDataType[]>(dummyData);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedAsset, setSelectedAsset] = useState<InventaryDataType | null>(null);
	const formRef = useRef<any>();
	const [isLoading, error, fetchData] = useHttp();
	const columns = createColumns(inventaryData, handleQuantityChange);

	useEffect(() => {
		setInventaryData(dummyData);
	}, []);

	function handleQuantityChange(record: InventaryDataType) {
		setSelectedAsset(record);
		setIsModalOpen(true);
	}

	console.log(inventaryData);

	function handleAddAsset(values: string[]) {
		console.log(values.length);
		setInventaryData((prev) => {
			return prev.map((asset) => {
				console.log(asset, selectedAsset);

				if (asset._id === selectedAsset?._id) {
					return { ...asset, quantity: asset.quantity + values.length };
				}
				return asset;
			});
		});
		setIsModalOpen(false);
		setSelectedAsset(null);
	}

	return (
		<>
			<Modal
				title="Add Asset to inventary"
				isOpen={isModalOpen}
				onCancel={() => {
					setIsModalOpen(false);
					setSelectedAsset(null);
				}}
				onOk={() => {
					formRef.current.submit();
				}}
			>
				<QuantityForm selectedAsset={selectedAsset} onAdd={handleAddAsset} ref={formRef} />
			</Modal>
			<TableHeader title="Inventary" hideButton />
			<Table
				data={dummyData}
				columns={columns}
				expandable={{
					expandedRowRender: (record) => <ExpandedRow record={record} />,
					expandIcon: ({ expanded }) => (expanded ? <CaretUpOutlined /> : <CaretDownOutlined />),
					expandRowByClick: true,
				}}
			/>
		</>
	);
};

export default InventaryContent;
