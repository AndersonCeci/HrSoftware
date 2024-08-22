import TableHeader from "../../components/Table/TableHeader";
import AssetContent from "./components/AssetContent";
import InventaryContent from "./components/InventaryContent";
import AssetInventaryContextProvider from "./context/AssetInventaryContext";
import { Tabs } from "antd";
import { useState } from "react";
import { t } from "i18next";

const INVENTARY_TAB = "inventary";
const ASSETS_TAB = "assets";

const AssetsPage: React.FC = () => {
	const [activeTab, setActiveTab] = useState(INVENTARY_TAB);
	const [isModalOpen, setIsModalOpen] = useState(false);

	function handleTabChange(key: string) {
		setActiveTab(key);
	}

	function handleModalOpen() {
		setIsModalOpen(true);
	}

	return (
		<section className="test">
			<TableHeader
				title={activeTab === INVENTARY_TAB ? t("inventaryPage") : t("assetPage")}
				hideButton={activeTab !== INVENTARY_TAB}
				onClick={handleModalOpen}
			/>

			<Tabs onChange={(key) => handleTabChange(key)} activeKey={activeTab} size="large" type="line">
				<Tabs.TabPane tab={t("inventory")} key={INVENTARY_TAB}>
					<AssetInventaryContextProvider>
						<InventaryContent isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
					</AssetInventaryContextProvider>
				</Tabs.TabPane>
				<Tabs.TabPane tab={t("assets")} key={ASSETS_TAB}>
					<AssetContent />
				</Tabs.TabPane>
			</Tabs>
		</section>
	);
};

export default AssetsPage;
