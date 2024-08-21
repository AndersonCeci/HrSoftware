import Table from "../../../components/Table/Table";
import Loader from "../../../components/Shared/Loader";
import createColumns from "./columns/InventaryColumn";
import { useState, useEffect, useRef, useContext } from "react";
import useHttp from "../../../hooks/useHttp";
import {
  AssetDatatype,
  AssetStatus,
  InventaryDataType,
} from "../types/AssetsDataType";
import Modal from "../../../components/Shared/Modal";
import QuantityForm from "./InventaryForm";
import ExpandedRow from "./ExpandesRow";
import { AssetInventaryContext } from "../context/AssetInventaryContext";

const INVENTARY_API = import.meta.env.REACT_APP_INVENTARY_API;
const ASSETS_API = import.meta.env.REACT_APP_ASSET_API;

type InventaryContentProps = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
};

const InventaryContent = ({
  isModalOpen,
  setIsModalOpen,
}: InventaryContentProps) => {
  const { assetData, getAssetData, addAssetTypeHandler, addQuantityHandler } =
    useContext(AssetInventaryContext);
  const [selectedInventaryData, setSelectedAsset] =
    useState<AssetDatatype | null>(null);
  const formRef = useRef<any>();
  const [isLoading, , fetchData] = useHttp();

  useEffect(() => {
    fetchData(
      {
        url: `${ASSETS_API}`,
      },
      (response) => getAssetData(response),
    );
  }, []);

  const columns = createColumns(assetData, handleQuantityChange);

  function handleQuantityChange(record: AssetDatatype) {
    setSelectedAsset(record);
    setIsModalOpen(true);
  }

  function handleAddAssetType(values: string[]) {
    const valueToSend =
      values[0].charAt(0).toUpperCase() + values[0].slice(1).toLowerCase();
    fetchData(
      useHttp.postRequestHelper(ASSETS_API, {
        assetName: valueToSend,
      }),
      (response) => {
        addAssetTypeHandler(response);
        setIsModalOpen(false);
      },
    );
  }

  function handleAddQuantity(values: string[], assetType: string) {
    fetchData(
      useHttp.postRequestHelper(INVENTARY_API, {
        assetName: assetType,
        assetCodes: values,
      }),
      (response) => {
        console.log(response, "response");
        addQuantityHandler(response, assetType);
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
          pagination={false}
          data={assetData}
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
