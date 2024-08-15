import { AssetDatatype, InventaryDataType } from "./AssetsDataType";

export type AssetFormProps = {
	selectedElement?: InventaryDataType | null;
	onAdd: (data: any) => void;
};

export type QuantityFormProps = {
	selectedAsset?: AssetDatatype | null;
	onAddAssetType: (values: string[]) => void;
	onAddQuantity: (values: string[], assetType: string) => void;
};
