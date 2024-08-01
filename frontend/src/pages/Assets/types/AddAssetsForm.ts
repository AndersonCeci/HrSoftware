import { AssetDatatype } from "./AssetsDataType";

export type AssetFormProps = {
	selectedElement?: AssetDatatype | undefined;
	onAdd: (newAsset: AssetDatatype) => void;
	onEdit: (editedAsset: AssetDatatype) => void;
};
