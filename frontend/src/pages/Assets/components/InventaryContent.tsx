import Table from "../../../components/Table/Table";
import Loader from "../../../components/Shared/Loader";
import createColumns from "./columns/InventaryColumn";
import { useState, useEffect, useRef } from "react";
import useHttp from "../../../hooks/useHttp";
import { AssetDatatype, AssetStatus, InventaryDataType } from "../types/AssetsDataType";
import Modal from "../../../components/Shared/Modal";
import QuantityForm from "./InventaryForm";
import ExpandedRow from "./ExpandesRow";

const INVENTARY_API = import.meta.env.REACT_APP_INVENTARY_API;
const ASSETS_API = import.meta.env.REACT_APP_ASSET_API;

type InventaryContentProps = {
	isModalOpen: boolean;
	setIsModalOpen: (value: boolean) => void;
};

const InventaryContent = ({ isModalOpen, setIsModalOpen }: InventaryContentProps) => {
	const [assetsData, setAssetsData] = useState<AssetDatatype[]>([]);
	// const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedInventaryData, setSelectedAsset] = useState<AssetDatatype | null>(null);
	const formRef = useRef<any>();
	const [isLoading, , fetchData] = useHttp();

	console.log(isModalOpen, "assetsData");

	useEffect(() => {
		fetchData(
			{
				url: `${ASSETS_API}`,
			},
			(response) => setAssetsData(response),
		);
	}, []);

	// console.log(assetsData, "inventaryData");

	const columns = createColumns(assetsData, handleQuantityChange);

	function handleQuantityChange(record: AssetDatatype) {
		setSelectedAsset(record);
		setIsModalOpen(true);
	}

	function handleAddAssetType(values: string[]) {
		const valueToSend = values[0].charAt(0).toUpperCase() + values[0].slice(1).toLowerCase();
		fetchData(
			useHttp.postRequestHelper(ASSETS_API, {
				assetName: valueToSend,
			}),
			(response) => {
				console.log(response, "response");
				setAssetsData((prev) => [...prev, response]);
				setIsModalOpen(false);
			},
		);
	}

	function handleAddQuantity(values: string[], assetType: string) {
		console.log(values, assetType, "values i posted");
		fetchData(
			useHttp.postRequestHelper(INVENTARY_API, {
				assetName: assetType,
				assetCodes: values,
			}),
			(response) => {
				setAssetsData((prev) => {
					const updatedAssets = prev.map((asset) => {
						if (asset.assetName === assetType) {
							return {
								...asset,
								quantity: asset.quantity + response.length,
								inventories: [...asset.inventories, ...response],
							};
						}
						return asset;
					});
					return updatedAssets;
				});
				setIsModalOpen(false);
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
				isLoading={isLoading}
			>
				<QuantityForm
					selectedAsset={selectedInventaryData}
					onAddAssetType={handleAddAssetType}
					onAddQuantity={handleAddQuantity}
					ref={formRef}
				/>
			</Modal>
			{!isLoading ? (
				<Table
					// identifier="assetID"
					data={assetsData}
					columns={columns}
					expandable={{
						expandedRowRender: (record) => <ExpandedRow record={record} />,
						// rowExpandable: (record) => record.inventories.length > 0,
						expandRowByClick: true,
					}}
				/>
			) : (
				<Loader />
			)}
		</>
	);
};

export default InventaryContent;
