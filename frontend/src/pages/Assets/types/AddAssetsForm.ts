import { AssetDatatype, InventaryDataType } from "./AssetsDataType";

export type AssetFormProps = {
	selectedElement?: InventaryDataType | null;
	onAdd: (data: any) => void;
};
