import Table from "../../components/Table/Table";
import TableHeader from "../../components/Table/TableHeader";
import Drawer from "../../components/Shared/Drawer";
import AddEmployeeForm from "./components/AddEmployeeForm";
import dummydataemployee from "../../utils/dummydataemployee";
import { useEffect, useState } from "react";
import type { EmployeeDataType } from "./types/Employee";
import { getColumns } from "./utils/EmployeeColumn";
import useHttp from "../../hooks/useHttp";

const EmploymentPage: React.FC = () => {
	const [tableData, setTableData] = useState<EmployeeDataType[]>([]);
	const [open, setOpen] = useState(false);
	const [editedData, setEditedData] = useState<EmployeeDataType | undefined>(undefined);
	const [isLoading, error, sendRequest] = useHttp();

	useEffect(() => {
		setTableData(dummydataemployee);
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
				if (item.id === editedEmployee.id) {
					return editedEmployee;
				}
				return item;
			}),
		);
	}

	function handleDeleteButtonClick(id: number) {
		setTableData((prev) => prev.filter((item) => item.id !== id));
	}

	function handlClose() {
		setOpen(false);
		setEditedData(undefined);
	}

	const columns = getColumns(tableData, handleEditButtonClick, handleDeleteButtonClick);

	return (
		<>
			<Drawer isOpen={open} onClose={handlClose}>
				<AddEmployeeForm
					selectedEmployee={editedData}
					onAdd={handleAddNewEmployee}
					onEdit={handleEditEmployee}
				/>
			</Drawer>
			<TableHeader title="Employment" onClick={() => setOpen(true)} />
			<section className="test">
				<Table columns={columns} data={tableData} fixed />
			</section>
		</>
	);
};

export default EmploymentPage;
