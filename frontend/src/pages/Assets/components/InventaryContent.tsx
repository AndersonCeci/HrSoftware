import Table from "../../../components/Table/Table";
import TableHeader from "../../../components/Table/TableHeader";
import createColumns from "../utils/InventaryColumn";
import { dummyData } from "../utils/inventaryDummy";
import { useState, useEffect } from "react";
import useHttp from "../../../hooks/useHttp";
import { InventaryDataType } from "../types/InventaryDataType";
import Modal from "../../../components/Shared/Modal";

const InventaryContent = () => {
  const [inventaryData, setInventaryData] =
    useState<InventaryDataType[]>(dummyData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantityModifier, setQuantityModifier] = useState<number>(0);
  const [isLoading, error, fetchData] = useHttp();
  const columns = createColumns(inventaryData, handleQuantityChange);

  useEffect(() => {
    setInventaryData(dummyData);
  }, []);

  function handleQuantityChange(id: string, value: number) {
    setInventaryData((prev) => {
      return prev.map((item) => {
        if (item._id === id) {
          console.log(item);
          return { ...item, quantity: item.quantity + value };
        }
        return item;
      });
    });
  }

  return (
    <>
      <Modal title="Add Asset to inventary" isOpen={isModalOpen}>
        <p>Modal Content</p>
      </Modal>
      <TableHeader
        title="Inventary"
        // onClick={() => {
        // 	setIsModalOpen(true);
        // }}
        hideButton
      />
      <Table data={dummyData} columns={columns} />
    </>
  );
};

export default InventaryContent;
