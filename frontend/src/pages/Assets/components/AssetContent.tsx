import Table from "../../../components/Table/Table";
import Loader from "../../../components/Shared/Loader";
import useHttp from "../../../hooks/useHttp";
import { getColumns } from "./columns/AssetsColumn";

const API = import.meta.env.REACT_APP_ASSET_API;

const AssetContent = ({ tableData }: any) => {
	const columns = getColumns(tableData);

	return <Table columns={columns} data={tableData} />;
};

export default AssetContent;
