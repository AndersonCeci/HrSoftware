import TableHeader from "../../components/Table/TableHeader";
import AssetContent from "./components/AssetContent";
import InventaryContent from "./components/InventaryContent";
import AssetInventaryContextProvider from "./context/AssetInventaryContext";
import { Tabs } from "antd";
import { useState } from "react";
import { t } from "i18next";
import useHttp from "../../hooks/useHttp";
import { isHR } from "../../utils/utils";

const INVENTARY_TAB = "inventary";
const ASSETS_TAB = "assets";
const API = import.meta.env.REACT_APP_ASSET_API;

const AssetsPage: React.FC = () => {
	const [activeTab, setActiveTab] = useState(INVENTARY_TAB);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [, , sendRequest] = useHttp();
	const [tableData, setTableData] = useState([]);
	const isHr = isHR();

	function handleTabChange(key: string) {
		setActiveTab(key);
		if (key === ASSETS_TAB) {
			getNewData();
		}
	}

	function handleModalOpen() {
		setIsModalOpen(true);
	}

	function getNewData() {
		sendRequest(
			{
				url: `${API}/employee`,
			},
			(data) => {
				setTableData(data);
			},
		);
	}

	return (
		<section className="test">
			<TableHeader
				title={activeTab === INVENTARY_TAB ? t("inventaryPage") : t("assetPage")}
				hideButton={isHr ? activeTab !== INVENTARY_TAB : true}
				onClick={handleModalOpen}
			/>

			<Tabs
				onChange={(key) => handleTabChange(key)}
				activeKey={isHr ? activeTab : ASSETS_TAB}
				size="large"
				type="line"
			>
				{isHr && (
					<Tabs.TabPane tab={t("inventory")} key={INVENTARY_TAB}>
						<AssetInventaryContextProvider>
							<InventaryContent isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
						</AssetInventaryContextProvider>
					</Tabs.TabPane>
				)}
				<Tabs.TabPane tab={t("assets")} key={ASSETS_TAB}>
					<AssetContent tableData={tableData} />
				</Tabs.TabPane>
			</Tabs>
		</section>
	);
};

export default AssetsPage;
