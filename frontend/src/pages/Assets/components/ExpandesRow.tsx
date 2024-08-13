import { Flex } from "antd";
import Table from "../../../components/Table/Table";
import "../styles/styles.css";
import { expandedColumns } from "./columns/ExpandesColumns";

const ExpandedRow = ({ record, assets, onChangeStatus }: any) => {
	const { assetName } = record;
	const filteredAssets = assets.filter((asset: any) => asset.assetID.assetName === assetName);

	const columns = expandedColumns(onChangeStatus);

	return (
		<Flex className="inner-table-container test">
			<Table pagination={false} data={filteredAssets} columns={columns} showHeader={false} />
		</Flex>
	);
};

export default ExpandedRow;
