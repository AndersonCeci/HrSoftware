import Table from "../../../components/Table/Table";
import TableHeader from "../../../components/Table/TableHeader";
import createColumns from "./columns/InventaryColumn";
import { useState, useEffect, useRef } from "react";
import useHttp from "../../../hooks/useHttp";
import { InventaryDataType } from "../types/InventaryDataType";
import { AssetDatatype, AssetStatus } from "../types/AssetsDataType";
import Modal from "../../../components/Shared/Modal";
import QuantityForm from "./InventaryForm";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import ExpandedRow from "./ExpandesRow";

const INVENTARY_FUCKING_API = import.meta.env.REACT_APP_INVENTORY_API;
const ASSETS_FUCKING_API = import.meta.env.REACT_APP_ASSET_API;

const InventaryContent = () => {
	const [inventaryData, setInventaryData] = useState<InventaryDataType[]>([]);
	const [allAssets, setAllAssets] = useState<AssetDatatype[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedInventaryData, setSelectedAsset] = useState<InventaryDataType | null>(null);
	const formRef = useRef<any>();
	const [, , fetchData] = useHttp();
	const columns = createColumns(inventaryData, handleQuantityChange);

	useEffect(() => {
		fetchData({ url: `${ASSETS_FUCKING_API}` }, (data) => {
			setInventaryData(data);
		});

		fetchData({ url: `${INVENTARY_FUCKING_API}` }, (data) => {
			setAllAssets(data);
		});
	}, []);

	function handleQuantityChange(record: InventaryDataType) {
		setSelectedAsset(record);
		setIsModalOpen(true);
	}

	function handleAssignAssetClick(){
		
	}

	function handleStatusChange(newStatus: AssetStatus, record: AssetDatatype) {
		console.log(newStatus, "HELLO MOm");
		console.log(record, "ILVI IDJICEINevijrvwsivbe");
		setAllAssets((prev) =>
			prev.map((asset) => {
				if (asset._id === record._id) {
					console.log("YOU ARE HERE");
					const updatedAsset = {
						...asset,
						status: newStatus,
					};
					console.log(updatedAsset);
					return updatedAsset;
				}
				return asset;
			}),
		);
	}

	function handleAddAssetType(values: string[]) {
		console.log(values, "values i posted");
		const valueToSubmit = {
			assetName: values[0],
		};
		fetchData(useHttp.postRequestHelper(ASSETS_FUCKING_API, valueToSubmit), (data) => {
			setInventaryData((prev) => {
				return [...prev, data];
			});
			setIsModalOpen(false);
		});
	}

	function handleAddQuantity(values: string[], assetType: string) {
		console.log(values, assetType, "values i posted");
		fetchData(
			useHttp.postRequestHelper(INVENTARY_FUCKING_API, {
				assetName: assetType,
				assetCodes: values,
			}),
			(data) => {
				console.log(data, "response");
				setAllAssets((prev) => {
					return [...prev, ...data];
				});
				setIsModalOpen(false);
				setSelectedAsset(null);
			},
		);
	}

	return (
		<>
			<Modal
				title={
					selectedInventaryData
						? `Add ${selectedInventaryData.assetName} to inventary`
						: "Add Asset Type"
				}
				isOpen={isModalOpen}
				onCancel={() => {
					setIsModalOpen(false);
					setSelectedAsset(null);
				}}
				onOk={() => {
					formRef.current.submit();
				}}
			>
				<QuantityForm
					selectedAsset={selectedInventaryData}
					onAddAssetType={handleAddAssetType}
					onAddQuantity={handleAddQuantity}
					ref={formRef}
				/>
			</Modal>
			<TableHeader
				title="Inventary"
				onClick={() => {
					setIsModalOpen(true);
				}}
			/>
			<Table
				data={inventaryData}
				columns={columns}
				expandable={{
					expandedRowRender: (record) => (
						<div className="treee">
							<ExpandedRow record={record} assets={allAssets} onChangeStatus={handleStatusChange} />
						</div>
					),
					expandIcon: ({ expanded }) => (expanded ? <CaretUpOutlined /> : <CaretDownOutlined />),
					expandRowByClick: true,
				}}
			/>
		</>
	);
};

export default InventaryContent;
