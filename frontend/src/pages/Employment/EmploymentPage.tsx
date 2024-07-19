import Table from "../../components/Table/Table";
import TableHeader from "../../components/Table/TableHeader";
import Drawer from "../../components/Shared/Drawer";
import AddEmployeeForm from "./components/AddEmployeeForm";
import dummydataemployee from "../../utils/dummydataemployee";
import { useEffect, useState } from "react";
import type { EmployeeDataType } from "./types/Employee";

// import CreateEmployeDrawer from "../../components/Employment/CreateEmployeeDrawer";

import { getColumns } from "./utils/EmployeeColumn";
// import CreateEmployeDrawer from "../../components/Employment/CreateEmployeeDrawer";

const EmploymentPage: React.FC = () => {
	const [tableData, setTableData] = useState<EmployeeDataType[]>([]);
	const [open, setOpen] = useState(false);
	const [isEditable, setIsEditable] = useState(false);
	const [editedEmployee, setEditedEmployee] = useState<EmployeeDataType>();

	useEffect(() => {
		setTableData(dummydataemployee);
	}, []);

	function handleModalClose() {
		setOpen(false);
	}

	const onEditEmployee = (record: EmployeeDataType) => {
		setOpen(true);
		console.log(record, "record");
		// form.setFieldsValue({
		//   name:record.name,
		//   email:record.email,
		//   position: record.position,
		// })

		setEditedEmployee(record);
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleEditSubmit = (values: any) => {
		// const updatedTask = {
		//   ...editedEmployee,
		//   ...values,
		// };
		// setTableDate((prev) =>
		//   prev.map((employee) =>
		//     employee.id === editedEmployee.id ? (updatedTask as EmployeeDataType) : employee
		//   )
		// );
		// setIsEditable(false);
	};

	const columns = getColumns(tableData);

	console.log(editedEmployee, "stateeeeeeee");
	//  console.log(editedEmployee.name?.split(" ")[0], "HELLO JOHN");
	return (
		<section className="test">
			<Drawer isOpen={open} onClose={handleModalClose}>
				<AddEmployeeForm />
			</Drawer>
			<TableHeader title="Employment" onClick={() => setOpen(true)} />
			<Table columns={columns} data={tableData} />
			{/* <CreateEmployeDrawer open={open} setOpen={setOpen} selectedEmployee={editedEmployee} /> */}
		</section>
	);
};

export default EmploymentPage;
