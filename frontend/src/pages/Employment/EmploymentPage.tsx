import Table from "../../components/Table/Table";
import TableHeader from "../../components/Table/TableHeader";
import Drawer from "../../components/Shared/Drawer";
import Loader from "../../components/Shared/Loader";
import AddEmployeeForm from "./components/AddEmployeeForm";
import { useEffect, useState } from "react";
import type { EmployeeDataType } from "./types/Employee";
import { getColumns } from "./utils/EmployeeColumn";
import useHttp from "../../hooks/useHttp";
import { t } from "i18next";

const API = import.meta.env.REACT_APP_EMPLOYEE_API;
const API_DELETE_EMPLOYEE = import.meta.env.REACT_APP_DELETE_EMPLOYEE_API;

const EmploymentPage: React.FC = () => {
  const [tableData, setTableData] = useState<EmployeeDataType[]>([]);
  const [open, setOpen] = useState(false);
  const [editedData, setEditedData] = useState<EmployeeDataType | undefined>(
    undefined
  );
  const [isLoading, error, sendRequest] = useHttp();
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    sendRequest(
      {
        url: API,
        headers: {
          "Content-Type": "application/json",
        },
      },
      setTableData
    );
  }, []);

  function handleEditButtonClick(record: EmployeeDataType) {
    console.log(record);
    setEditedData(record);
    setOpen(true);
  }

  function handleAddNewEmployee(newEmployee: EmployeeDataType) {
    setTableData((prev) => [...prev, newEmployee]);
  }

  function handleEditEmployee(editedEmployee: EmployeeDataType) {
    setTableData((prev) =>
      prev.map((item) => {
        if (item._id === editedEmployee._id) {
          return editedEmployee;
        }
        return item;
      })
    );
  }

  function handleDeleteButtonClick(record: EmployeeDataType) {
    sendRequest(
      {
        url: `${API_DELETE_EMPLOYEE}/${record._id}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
		
      },
      () => {
        setTableData((prev) => prev.filter((item) => item._id !== record._id));
        setIsDeleting(false);
      }
    );
  }

  function handlClose() {
    setOpen(false);
    setEditedData(undefined);
  }

  const columns = getColumns(
    tableData,
    handleEditButtonClick,
    handleDeleteButtonClick
  );

  return (
    <>
      <Drawer height={500} isOpen={open} onClose={handlClose}>
        <AddEmployeeForm
          selectedEmployee={editedData}
          onAdd={handleAddNewEmployee}
          onEdit={handleEditEmployee}
        />
      </Drawer>
      <TableHeader title={t("employment")}  onClick={() => setOpen(true)} />
      <section className="test">
        {isLoading && !isDeleting ? (
          <Loader />
        ) : (
          <Table columns={columns} data={tableData} fixed />
        )}
      </section>
    </>
  );
};

export default EmploymentPage;
