import TableHeader from "../../components/Table/TableHeader";
import AssetContent from "./components/AssetContent";
import InventaryContent from "./components/InventaryContent";
import AssetInventaryContextProvider from "./context/AssetInventaryContext";
import { ConfigProvider, Tabs } from "antd";
import { useState } from "react";
const AssetsPage: React.FC = () => {
	const [activeTab, setActiveTab] = useState("Inventary");
	const [isMoalOpen, setIsModalOpen] = useState(false);

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
			<ConfigProvider>
				<Tabs
					onChange={(key) => handleTabChange(key)}
					activeKey={activeTab}
					size="large"
					type="line"
				>
					<Tabs.TabPane tab="Inventary" key="Inventary">
						<AssetInventaryContextProvider>
							<InventaryContent isModalOpen={isMoalOpen} setIsModalOpen={setIsModalOpen} />
						</AssetInventaryContextProvider>
					</Tabs.TabPane>
					<Tabs.TabPane tab="Assets" key="Assets">
						<AssetContent />
					</Tabs.TabPane>
				</Tabs>
			</ConfigProvider>
		</section>
	);
};

export default AssetsPage;
