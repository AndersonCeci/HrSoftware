export type AssetDatatype = {
    id: number;
    type: string;
    code: number;
    date: string;
    employee: string;
};

export type NewAssetType = {
	type: string;
	date: string;
	employee: string;
};

export type AssetContextType = {
	tableData: AssetDatatype[];
	newAsset: NewAssetType;
	setTableData: (data: AssetDatatype[]) => void;
	setNewAsset: (identifier: string, value: string) => void;
	addNewAsset: (newAsset: AssetDatatype) => void;
    clearNewAsset: () => void;
};