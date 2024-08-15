import TableHeader from "../../components/Table/TableHeader";
import AssetContent from "./components/AssetContent";
import InventaryContent from "./components/InventaryContent";
import { Tabs } from "antd";
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
			<Tabs  onChange={(key) => handleTabChange(key)} indicator={{
				size: 100
			}}>
				<Tabs.TabPane tab="Inventary" key="Inventary">
					<InventaryContent isModalOpen={isMoalOpen} setIsModalOpen={setIsModalOpen} />
				</Tabs.TabPane>
				<Tabs.TabPane tab="Assets" key="Assets">
					<AssetContent />
				</Tabs.TabPane>
			</Tabs>
		</section>
	);
};

export default AssetsPage;
