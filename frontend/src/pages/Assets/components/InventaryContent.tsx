import Table from "../../../components/Table/Table";
import TableHeader from "../../../components/Table/TableHeader";
import createColumns from "../utils/InventaryColumn";
import { useState, useEffect, useRef } from "react";
import useHttp from "../../../hooks/useHttp";
import { InventaryDataType } from "../types/InventaryDataType";
import Modal from "../../../components/Shared/Modal";
import QuantityForm from "./InventaryForm";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import ExpandedRow from "./ExpandesRow";

const API = import.meta.env.REACT_APP_INVENTORY_API;

const InventaryContent = () => {
	const [inventaryData, setInventaryData] = useState<InventaryDataType[]>([]);
	const [allAssets, setAllAssets] = useState<InventaryDataType[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedAsset, setSelectedAsset] = useState<InventaryDataType | null>(null);
	const formRef = useRef<any>();
	const [isLoading, error, fetchData] = useHttp();

	useEffect(() => {
		fetchData({ url: `${API}/counts` }, (data) => {
			setInventaryData(data);
		});

		fetchData({ url: `${API}` }, (data) => {
			setAllAssets(data);
		});
	}, []);

	const columns = createColumns(inventaryData, handleQuantityChange);

	function handleQuantityChange(record: InventaryDataType) {
		setSelectedAsset(record);
		setIsModalOpen(true);
	}

	// function handleAddAsset(values: string[]) {
	// 	setInventaryData((prev) => {
	// 		return prev.map((asset) => {
	// 			console.log(asset, selectedAsset);

	// 			if (asset._id === selectedAsset?._id) {
	// 				return { ...asset, count: asset.quantity + values.length };
	// 			}
	// 			return asset;
	// 		});
	// 	});
	// 	setIsModalOpen(false);
	// 	setSelectedAsset(null);
	// }

	function handleAddQuantity(values: string[], assetType: string) {
		fetchData(
			useHttp.postRequestHelper(API, {
				assetType,
				assetCode: parseInt(values[0]),
			}),
			(data) => {
				console.log(data, "response");
				setAllAssets((prev) => {
					return [...prev, data];
				});
				setInventaryData((prev) => {
					return prev.map((asset) => {
						console.log(asset, assetType, "asset");
						if (asset.assetType === assetType) {
							return { ...asset, count: asset.count + 1 };
						}
						return asset;
					});
				});
			},
		);
	}

	// function createTestAsset() {
	// 	fetchData(
	// 		useHttp.postRequestHelper(API, {
	// 			assetType: "Table",
	// 			assetCode: 13256535579671,
	// 		}),
	// 		(data) => {
	// 			setInventaryData((prev) => {
	// 				return [...prev, data];
	// 			});
	// 		},
	// 	);
	// }

	return (
		<>
			<Modal
				title={selectedAsset ? `Add ${selectedAsset.assetType} to inventary` : "Add Asset Type"}
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
					selectedAsset={selectedAsset}
					onAddAssetType={() => {}}
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
				identifier="assetType"
				data={inventaryData}
				columns={columns}
				expandable={{
					expandedRowRender: (record) => (
						<div className="treee">
							<ExpandedRow record={record} assets={allAssets} />
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
