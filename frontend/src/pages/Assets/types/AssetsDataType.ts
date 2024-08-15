export type AssetDatatype = {
	_id: string;
	assetName: string;
	quantity: number;
	reserved: number;
	inventories: InventaryDataType[];
};

export type InventaryDataType = {
	_id: string;
	assetCodes: string;
	assetID: string;
	employeeID: string;
	assignedDate: Date;
	status: AssetStatus;
};

export enum AssetStatus {
	Available = "Available",
	Assigned = "Assigned",
	OnRepair = "OnRepair",
}
