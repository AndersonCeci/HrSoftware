import TableHeader from "../../../components/Table/TableHeader";
import Table from "../../../components/Table/Table";
import { useEffect, useState } from "react";
import { LeftDataType } from "../types/Left";
import useHttp from "../../../hooks/useHttp";
import Loader from "../../../components/Shared/Loader";
import { getColumns } from "../utils/LeftColumn";

const API = import.meta.env.REACT_APP_DELETE_EMPLOYEE_API;

const DismissedPage: React.FC = () => {
	const [tableData, setTableData] = useState<LeftDataType[]>([]);
	const [isLoading, error, sendRequest] = useHttp();
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		sendRequest(
			{
				url: API,
			
			},
			setTableData,
		);
	}, []);

	const columns = getColumns(tableData);

	return (
		<>
			<TableHeader title="Dismissed" hideButton />
			<section className="test">
				{isLoading && !isDeleting ? <Loader /> : <Table columns={columns} data={tableData} fixed />}
			</section>
		</>
	);
};

export default DismissedPage;
