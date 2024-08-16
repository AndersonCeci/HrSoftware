import { Flex } from "antd";
import Table from "../../../components/Table/Table";
import "../styles/styles.css";
import { expandedColumns } from "../utils/ExpandesColumns";

const ExpandedRow = ({ record, assets }: any) => {
	const { assetType } = record;
	const filteredAssets = assets.filter((asset: any) => asset.assetType === assetType);

	const columns = expandedColumns()

	return (
		<Flex className="inner-table-container test">
			<Table
				pagination={false}
				data={filteredAssets}
				columns={columns}
			/>
		</Flex>
	);
};

export default ExpandedRow;
