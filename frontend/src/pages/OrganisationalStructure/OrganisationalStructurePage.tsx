import { useState } from "react";
import { OrganizationChart } from "primereact/organizationchart";
import { TreeNode } from "primereact/treenode";
import "../OrganisationalStructure/style/OrganisationalStructure.css";
import "../../../node_modules/primereact/resources/primereact.css";
import "../../../node_modules/primereact/resources/themes/lara-light-blue/theme.css";
import Button from "../../components/Shared/Button";
import { PlusCircleOutlined } from "@ant-design/icons";
import { ButtonSize, ButtonType } from "../../enums/Button";
import AddNode from "./AddNode";

export default function SelectionDemo() {
  const [selection, setSelection] = useState<TreeNode[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data] = useState<TreeNode[]>([
    {
      expanded: true,
      key: "person",
      className: "card ceo-card",
      data: {
        image:
          "https://primefaces.org/cdn/primereact/images/avatar/stephenshaw.png",
        name: "Pasho Toska",
        title: "CEO",
      },
      children: [
        {
          expanded: true,
          key: "label",
          className: "label hr-department",
          data: {
            name: "HR Department",
          },
          children: [
            {
              // expanded: true,
              className: "card hr-card",
              key: "person",
              data: {
                image:
                  "https://primefaces.org/cdn/primereact/images/avatar/annafali.png",
                name: "Elizabeta Guri",
                title: "CMO",
              },
            },
          ],
        },
        {
          expanded: true,
          key: "label",
          className: "label it-department",

          data: {
            name: "IT Department",
          },
          children: [
            {
              className: "card prj-card",
              key: "person",
              data: {
                image:
                  "https://primefaces.org/cdn/primereact/images/avatar/annafali.png",
                name: "Jane Doe",
                title: "Project Manager",
              },
              children: [
                {
                  className: "card w-card",
                  key: "person",
                  data: {
                    image:
                      "https://primefaces.org/cdn/primereact/images/avatar/annafali.png",
                    name: "Jane Doe",
                    title: "FullStack",
                  },
                },
                {
                  className: "card w-card",
                  key: "person",
                  data: {
                    image:
                      "https://primefaces.org/cdn/primereact/images/avatar/annafali.png",
                    name: "Jane Doe",
                    title: "FrontEnd",
                  },
                },
                {
                  className: "card w-card",
                  key: "person",
                  data: {
                    image:
                      "https://primefaces.org/cdn/primereact/images/avatar/annafali.png",
                    name: "Jane Doe",
                    title: "BackEnd",
                  },
                },
              ],
            },
            {
              className: "card prj-card",
              key: "person",
              data: {
                image:
                  "https://primefaces.org/cdn/primereact/images/avatar/annafali.png",
                name: "Jane Doe",
                title: "Project Manager",
              },
              children: [
                {
                  className: "card w-card",
                  key: "person",
                  data: {
                    image:
                      "https://primefaces.org/cdn/primereact/images/avatar/annafali.png",
                    name: "Jane Doe",
                    title: "FullStack",
                  },
                },
                {
                  className: "card w-card",
                  key: "person",
                  data: {
                    image:
                      "https://primefaces.org/cdn/primereact/images/avatar/annafali.png",
                    name: "Jane Doe",
                    title: "FrontEnd",
                  },
                },
                {
                  className: "card w-card",
                  key: "person",
                  data: {
                    image:
                      "https://primefaces.org/cdn/primereact/images/avatar/annafali.png",
                    name: "Jane Doe",
                    title: "BackEnd",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const nodeTemplate = (node: TreeNode) => {
    if (node.key === "person") {
      return (
        <div className="flex flex-column">
          <div className="flex flex-column align-items-center">
            <img
              alt={node.data.name}
              src={node.data.image}
              className="mb-3 w-3rem h-3rem"
            />
            <span className="font-bold mb-2">{node.data.name}</span>
            <span>{node.data.title}</span>
          </div>
        </div>
      );
    }
    if (node.key === "label") {
      return (
        <div className="flex-label label">
          <span className="font-bold mb-2">{node.data.name}</span>
        </div>
      );
    }

    return node.label;
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
      <OrganizationChart
        value={data}
        selectionMode="multiple"
        selection={selection}
        onSelectionChange={(e) => setSelection(e.data)}
        nodeTemplate={nodeTemplate}
      />
    </div>
  );
}
