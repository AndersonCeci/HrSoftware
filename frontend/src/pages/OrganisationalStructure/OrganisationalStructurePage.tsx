import { useEffect, useState } from "react";
import { OrganizationChart } from "primereact/organizationchart";
import { TreeNode } from "primereact/treenode";
import "../OrganisationalStructure/style/OrganisationalStructure.css";
import "../../../node_modules/primereact/resources/primereact.css";
import "../../../node_modules/primereact/resources/themes/lara-light-blue/theme.css";
import Button from "../../components/Shared/Button";
import { PlusCircleOutlined } from "@ant-design/icons";
import { ButtonSize, ButtonType } from "../../enums/Button";
import AddNode from "./AddNode";
import useHttp from "../../hooks/useHttp";
import { formatData, nodeTemplate } from "./helperFunctions";

export default function SelectionDemo() {
  const [selection, setSelection] = useState<TreeNode[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [, , sendRequest] = useHttp();

  useEffect(() => {
    sendRequest(
      {
        url: "http://localhost:3000/employees/organizational-tree",
        headers: {
          "Content-Type": "application/json",
        },
      },

      (data) => {
        data && formatData(data, setData);
      }
    );
  }, []);

  const [data, setData] = useState<TreeNode[]>([]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <div className="card overflow-x-auto">
      <Button
        size={ButtonSize.LARGE}
        type={ButtonType.PRIMARY}
        style={{ float: "right" }}
        onClick={showModal}
      >
        <PlusCircleOutlined />
        Add
      </Button>
      <AddNode
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
      />

      {data && data.length > 0 && (
        <OrganizationChart
          value={data}
          selectionMode="multiple"
          selection={selection}
          onSelectionChange={(e: any) => setSelection(e.data)}
          nodeTemplate={nodeTemplate}
        />
      )}
    </div>
  );
}
