import Table from "../../../components/Table/Table";
import { dummyAssets } from "../utils/inventaryDummy";

const ExpandedRow = ({ record }: any) => {
    console.log(record);
    const { assetType } = record;
    const filteredAssets = dummyAssets.filter((asset) => asset.assetType === assetType);
    
	return (
		<Table
		
    
            pagination={false}
			data={filteredAssets}
			columns={[
				{ title: "Code", dataIndex: "assetCode", key: "code" },
				{ title: "Employee Name", dataIndex: "userName", key: "userName" },
                { title: "Date", dataIndex: "dateGiven", key: "dateGiven" },
			]}
		/>
	);
};

export default ExpandedRow;
