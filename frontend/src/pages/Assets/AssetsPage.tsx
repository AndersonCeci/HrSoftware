import TableHeader from "../../components/Table/TableHeader";
import AssetContent from "./components/AssetContent";
import InventaryContent from "./components/InventaryContent";
import { Tabs } from "antd";

const AssetsPage: React.FC = () => {
  return (
    <section className="test">
      <Tabs
        defaultActiveKey="2"
        centered
        onTabClick={() => {
          console.log("Assets tab clicked");
        }}
      >
        <Tabs.TabPane tab="Assets" key="1">
          <>
            <AssetContent />
          </>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Inventary" key="2">
          <InventaryContent />
        </Tabs.TabPane>
      </Tabs>
    </section>
  );
};

export default AssetsPage;
