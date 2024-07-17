import React, { createContext, useState } from "react";
import { NewAssetType, AssetDatatype, AssetContextType } from "../types/AssetsDataType";


const newEmptyAsset: NewAssetType = {
	type: "",
	date: "",
	employee: "",
};

export const AssetContext = createContext<AssetContextType>({
	tableData: [],
	setTableData: () => {},
	newAsset: newEmptyAsset,
	setNewAsset: (identifier: string, value: string) => {},
	addNewAsset: (newAsset: AssetDatatype) => {},
	clearNewAsset: () => {},
});

const AssetProvider = ({ children }: { children: React.ReactNode }) => {
	const [tableData, setTableData] = useState<AssetDatatype[]>([]);
	const [newAsset, setNewAsset] = useState<NewAssetType>(newEmptyAsset);

	function getInitialData(data: AssetDatatype[]) {
		setTableData(data);
	}

	function handleNewAsset(identifier: string, value: string) {
		setNewAsset((prev) => ({ ...prev, [identifier]: value }));
	}

	function handleAddAsset(newAsset: AssetDatatype) {
		setTableData((prev) => [...prev, newAsset]);
	}

	function clearNewAsset() {
		setNewAsset(newEmptyAsset);
	}

	return (
		<AssetContext.Provider
			value={{
				tableData,
				setTableData: getInitialData,
				newAsset: newAsset,
				setNewAsset: handleNewAsset,
				addNewAsset: handleAddAsset,
				clearNewAsset: clearNewAsset,
			}}
		>
			{children}
		</AssetContext.Provider>
	);
};

export default AssetProvider;
