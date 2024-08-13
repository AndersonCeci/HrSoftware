export type AssetDatatype = {
	_id: string;
	assetName: string;
	status: AssetStatus;
	dateGiven: string;
	userName: string;
};

export enum AssetStatus {
	Available = "Available",
	Assigned = "Assigned",
	OnRepair = "OnRepair",
}
