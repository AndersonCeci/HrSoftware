import { createContext, useState } from "react";
import { AssetDatatype, InventaryDataType } from "../types/AssetsDataType";

export const AssetInventaryContext = createContext({
	assetData: [] as AssetDatatype[],
	getAssetData: (_assets: AssetDatatype[]) => {},
	addAssetTypeHandler: (_newAssets: AssetDatatype[]) => {},
	addQuantityHandler: (_values: InventaryDataType[], _assetType: string) => {},
	updateInventaryItemHandler: (
		_updatedRecord: InventaryDataType,
		_modifiers: {
			onRepairModifier: number;
			reservedModifier: number;
		},
	) => {},
	deleteFromInventaryHandler: (_deletedINventart: InventaryDataType) => {},
});

export default function AssetInventaryContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [assetsData, setAssetsData] = useState<AssetDatatype[]>([]);

	function getAssetData(assets: AssetDatatype[]) {
		const assetsData = assets.map((asset) => {
			if (Object.keys(asset.inventories[0]).length > 0) {
				return asset;
			} else {
				return {
					...asset,
					quantity: 0,
					onRepair: 0,
					reserved: 0,
					inventories: [],
				};
			}
		});
		setAssetsData(assetsData);
	}

	function addAssetTypeHandler(newAssets: AssetDatatype[]) {
		const newAssetsData = newAssets.map((asset) => {
			return {
				...asset,
				quantity: 0,
				onRepair: 0,
				reserved: 0,
				inventories: [],
			};
		});

		setAssetsData((prev) => [...prev, ...newAssetsData]);
	}

  function addQuantityHandler(
    newAssets: InventaryDataType[],
    assetType: string,
  ) {
    setAssetsData((prev) => {
      const updatedAssets = prev.map((asset) => {
        if (asset.assetName === assetType) {
          return {
            ...asset,
            quantity: asset.quantity + newAssets.length,
            inventories: [...asset.inventories, ...newAssets],
          };
        }
        return asset;
      });
      return updatedAssets;
    });
  }

  function deleteFromInventaryHandler(deletedInventary: InventaryDataType) {
    setAssetsData((prev) => {
      const updatedAssets = prev.map((asset) => {
        if (asset._id === deletedInventary.assetID) {
          const deletedInventaryStatus = deletedInventary.status;
          return {
            ...asset,
            quantity: asset.quantity - 1,
            onRepair:
              deletedInventaryStatus === "OnRepair"
                ? asset.onRepair - 1
                : asset.onRepair,
            reserved:
              deletedInventaryStatus === "Assigned"
                ? asset.reserved - 1
                : asset.reserved,
            inventories: asset.inventories.filter(
              (item) => item._id !== deletedInventary._id,
            ),
          };
        }
        return asset;
      });
      return updatedAssets;
    });
  }

  function updateInventaryItemHandler(
    updatedRecord: InventaryDataType,
    modifiers: {
      onRepairModifier: number;
      reservedModifier: number;
    },
  ) {
    setAssetsData((prev) => {
      const updatedAssets = prev.map((asset) => {
        if (asset._id === updatedRecord.assetID) {
          return {
            ...asset,
            inventories: asset.inventories.map((item) =>
              item._id === updatedRecord._id ? updatedRecord : item,
            ),
            onRepair: asset.onRepair + modifiers.onRepairModifier,
            reserved: asset.reserved + modifiers.reservedModifier,
          };
        }
        return asset;
      });
      return updatedAssets;
    });
  }

  const ctxValue = {
    assetData: assetsData,
    getAssetData,
    addAssetTypeHandler,
    addQuantityHandler,
    updateInventaryItemHandler,
    deleteFromInventaryHandler,
  };

  return (
    <AssetInventaryContext.Provider value={ctxValue}>
      {children}
    </AssetInventaryContext.Provider>
  );
}
