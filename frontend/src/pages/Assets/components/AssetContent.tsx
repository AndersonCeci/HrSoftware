import Table from "../../../components/Table/Table";
import Loader from "../../../components/Shared/Loader";
import { useState, useEffect } from "react";
import useHttp from "../../../hooks/useHttp";
import { getColumns } from "./columns/AssetsColumn";

const API = import.meta.env.REACT_APP_ASSET_API;

const AssetContent = () => {
	const [tableData, setTableData] = useState([]);
	const [isLoading, error, sendRequest] = useHttp();

	useEffect(() => {
		sendRequest(
			{
				url: `${API}/employee`,
			},
			(data) => {
				setTableData(data);
			},
		);
	}, []);

	console.log(tableData);

	const columns = getColumns(tableData);

	const display = error ? <div>{error}</div> : <Table columns={columns} data={tableData} />;

	return <>{!isLoading ? display : <Loader />}</>;
};

export default AssetContent;
