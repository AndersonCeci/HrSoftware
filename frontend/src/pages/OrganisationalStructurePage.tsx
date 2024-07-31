import { useState } from "react";
import { OrganizationChart } from "primereact/organizationchart";
import { TreeNode } from "primereact/treenode";
import "../styles/OrganisationalStructure/OrganisationalStructure.css";

export default function SelectionDemo() {
  const [selection, setSelection] = useState<TreeNode[]>([]);
  const [data] = useState<TreeNode[]>([
    {
      expanded: true,
      key: "person",
      className: "card ceo-card",
      data: {
        image:
          "https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png",
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
              // expanded: true,
              className: "card hr-card",
              key: "label",
              data: {
                name: "Project 1",
              },
              children: [
                {
                  className: "card hr-card",
                  key: "person",
                  data: {
                    image:
                      "https://primefaces.org/cdn/primereact/images/avatar/annafali.png",
                    name: "Elizabeta Guri",
                    title: "CMO",
                  },
                },
                {
                  className: "card hr-card",
                  key: "person",
                  data: {
                    image:
                      "https://primefaces.org/cdn/primereact/images/avatar/annafali.png",
                    name: "Elizabeta Guri",
                    title: "CMO",
                  },
                },
                {
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
              // expanded: true,
              className: "card hr-card",
              key: "label",
              data: {
                name: "Project 2",
              },
              children: [
                {
                  className: "card hr-card",
                  key: "person",
                  data: {
                    image:
                      "https://primefaces.org/cdn/primereact/images/avatar/annafali.png",
                    name: "Elizabeta Guri",
                    title: "CMO",
                  },
                },
                {
                  className: "card hr-card",
                  key: "person",
                  data: {
                    image:
                      "https://primefaces.org/cdn/primereact/images/avatar/annafali.png",
                    name: "Elizabeta Guri",
                    title: "CMO",
                  },
                },
                {
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
            // {
            //   // expanded: true,
            //   className: "card hr-card",
            //   key: "label",
            //   data: {
            //     name: "Project 3",
            //   },
            //   children: [
            //     {
            //       className: "card hr-card",
            //       key: "person",
            //       data: {
            //         image:
            //           "https://primefaces.org/cdn/primereact/images/avatar/annafali.png",
            //         name: "Elizabeta Guri",
            //         title: "CMO",
            //       },
            //     },
            //     {
            //       className: "card hr-card",
            //       key: "person",
            //       data: {
            //         image:
            //           "https://primefaces.org/cdn/primereact/images/avatar/annafali.png",
            //         name: "Elizabeta Guri",
            //         title: "CMO",
            //       },
            //     },
            //     {
            //       className: "card hr-card",
            //       key: "person",
            //       data: {
            //         image:
            //           "https://primefaces.org/cdn/primereact/images/avatar/annafali.png",
            //         name: "Elizabeta Guri",
            //         title: "CMO",
            //       },
            //     },
            //   ],
            // },
          ],
        },
      ],
    },
  ]);

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
