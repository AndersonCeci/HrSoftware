import Table from "../../../components/Table/Table";
import TableHeader from "../../../components/Table/TableHeader";
import Modal from "../../../components/Shared/Modal";
import Loader from "../../../components/Shared/Loader";
import AssetForm from "./AssetForm";
import { AssetDatatype } from "../types/AssetsDataType";
import { useState, useEffect, useRef } from "react";
import useHttp from "../../../hooks/useHttp";

import { getColumns } from "../utils/AssetsColumn";
import { t } from "i18next";

const API = import.meta.env.REACT_APP_ASSET_API;

const AssetContent = () => {
  const [tableData, setTableData] = useState<AssetDatatype[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const editFormRef = useRef<HTMLFormElement>();
  const [isLoading, error, sendRequest] = useHttp();
  const [selectedElement, setSelectedElement] = useState<
    AssetDatatype | undefined
  >(undefined);

  useEffect(() => {
    sendRequest({ url: API }, setTableData);
  }, []);

  function handleDataDelete(id: string) {
    sendRequest(
      {
        url: `${API}/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
      () => {
        setTableData((prev) => prev.filter((item) => item._id !== id));
      },
    );
  }

  function handleStartEditing(id: string) {
    const newElement = tableData.find((item) => item._id === id);
    setSelectedElement(newElement);
    setIsModalVisible(true);
  }

  function handleAssetEdit(newAsset: AssetDatatype) {
    setTableData((prev) => {
      const newTableData = prev.map((item) => {
        if (item._id === newAsset._id) {
          return newAsset;
        }
        return item;
      });
      return newTableData;
    });
    setIsModalVisible(false);
    setSelectedElement(undefined);
  }

  function handleAssetAdd(newAsset: AssetDatatype) {
    setTableData((prev) => [...prev, newAsset]);
    setIsModalVisible(false);
  }

  const columns = getColumns(tableData, handleDataDelete, handleStartEditing);

  const display = error ? (
    <div>{error}</div>
  ) : (
    <Table columns={columns} data={tableData} />
  );

  return (
    <>
      <Modal
        title={selectedElement ? "Edit Asset" : "Assign New Asset"}
        isOpen={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setSelectedElement(undefined);
        }}
        onOk={() => {
          editFormRef.current?.submit();
        }}
      >
        <AssetForm
          ref={editFormRef}
          selectedElement={selectedElement}
          onAdd={handleAssetAdd}
          onEdit={handleAssetEdit}
        />
      </Modal>
      <TableHeader
        title={t("assetsTitle")}
        onClick={() => {
          setIsModalVisible(true);
        }}
      />

      {!isLoading ? display : <Loader />}
    </>
  );
};

export default AssetContent;
