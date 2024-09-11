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
import { nodeTemplate } from "./helperFunctions";
import { EmployData } from "./types/OrganizationalTypes";

export default function SelectionDemo() {
  const [selection, setSelection] = useState<TreeNode[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [organizationData, setOrganizationData] = useState<any>([]);
  const [, , sendRequest] = useHttp();

  const formatData = async (organizationData: any) => {
    const teamLeaders = organizationData && organizationData[0]?.teamLeaders;
    const hrAndCeo = organizationData && organizationData[0]?.hrAndCeo.length;

    const hrNodes =
      hrAndCeo.length > 0 &&
      hrAndCeo
        ?.filter((emp: any) => emp.role === "hr")
        ?.map((emp: any) => ({
          key: emp._id,
          className: "card hr-card",
          data: {
            image: emp.profilePhoto || "default_hr_image_url",
            name: emp.name,
            title: emp.position,
          },
        }));

    const ceoNode =
      hrAndCeo.length > 0 && hrAndCeo?.find((emp) => emp.role === "ceo");
    const treeNode = [
      {
        key: ceoNode?._id,
        className: "card ceo-card",
        data: {
          image: ceoNode?.profilePhoto || "default_ceo_image_url",
          name: ceoNode?.name,
          title: "CEO",
        },
        children: [
          {
            key: "label",
            className: "card hr-card",
            data: {
              name: "HR Department",
            },
            children: hrNodes,
          },
          {
            key: "label",
            className: "label it-department",
            data: {
              name: "IT Department",
            },
            children: teamLeaders?.map((leader: any) => {
              console.log(leader, "kea");
              return {
                key: leader._id,
                className: "card prj-card",
                data: {
                  image: leader.teamLeaderProfilePhoto,
                  name: leader.teamLeaderName,
                  title: "Team Leader",
                },
                children: leader.employees?.map((emp: EmployData) => {
                  console.log(emp, "emp");
                  return {
                    key: emp.id,
                    className: "card w-card",
                    data: {
                      image: emp.profilePhoto || "default_employee_image_url",
                      name: emp.name,
                      title: emp.position,
                    },
                  };
                }),
              };
            }),
          },
        ],
      },
    ];
    console.log(treeNode, "tree");
    setData(treeNode);
    // return treeNode;
  };

  useEffect(() => {
    sendRequest(
      {
        url: "http://localhost:3000/employees/organizational-tree",
        headers: {
          "Content-Type": "application/json",
        },
      },
      (data) => {
        data && formatData(data);
      }
    );

    console.log("reres");
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
