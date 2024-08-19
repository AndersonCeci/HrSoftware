import TableHeader from "../../components/Table/TableHeader";
import AssetContent from "./components/AssetContent";
import InventaryContent from "./components/InventaryContent";
import AssetInventaryContextProvider from "./context/AssetInventaryContext";
import { ConfigProvider, Tabs } from "antd";
import { useState } from "react";
const AssetsPage: React.FC = () => {
	const [activeTab, setActiveTab] = useState("Inventary");
	const [isModalOpen, setIsModalOpen] = useState(false);

	function handleTabChange(key: string) {
		setActiveTab(key);
	}

	function handleModalOpen() {
		setIsModalOpen(true);
	}

	function handleModalClose() {
		setIsModalOpen(false);
	}

	return (
		<section className="test">
			<TableHeader
				title={`${activeTab} Page`}
				hideButton={activeTab !== "Inventary"}
				onClick={handleModalOpen}
			/>

			<Tabs onChange={(key) => handleTabChange(key)} activeKey={activeTab} size="large" type="line">
				<Tabs.TabPane tab="Inventary" key="Inventary">
					<AssetInventaryContextProvider>
						<InventaryContent isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
					</AssetInventaryContextProvider>
				</Tabs.TabPane>
				<Tabs.TabPane tab="Assets" key="Assets">
					<AssetContent />
				</Tabs.TabPane>
			</Tabs>
		</section>
	);
};

export default AssetsPage;
