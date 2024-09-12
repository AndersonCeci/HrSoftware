import { TreeNode } from "primereact/treenode";
import { EmployData, HrAndCeo, OrganizationData, TeamLeader } from "./types/OrganizationalTypes";

export const nodeTemplate = (node: TreeNode) => {
  if (node.className?.includes("card")) {
    return (
      <div className="flex flex-column">
        <div className="flex flex-column align-items-center">
          <img
            src={node.data.image}
            className="mb-3 w-3rem h-3rem"
          />
          <span className="font-bold mb-2">{node.data.name}</span>
          <span>{node.data.title}</span>
        </div>
      </div>
    );
  }
  if (node.className?.includes("label")) {
    return (
      <div className="flex-label label">
        <span className="font-bold mb-2">{node.data.name}</span>
      </div>
    );
  }
  return node.label || null;
};


export const formatData = async (
  organizationData: OrganizationData,
  setData: React.Dispatch<React.SetStateAction<TreeNode[]>>
) => {
  const teamLeaders = organizationData && organizationData[0]?.teamLeaders;
  const hrAndCeo = organizationData && organizationData[0]?.hrAndCeo;

  const hrNodes =
    hrAndCeo.length > 0 &&
    hrAndCeo
      ?.filter((emp: HrAndCeo) => emp.role === "hr")
      ?.map((emp: HrAndCeo) => ({
        key: emp._id,
        className: "card hr-card",
        data: {
          image: emp.profilePhoto || "default_hr_image_url",
          name: emp.name,
          title: emp.position,
        },
      }));

  const ceoNode =
    hrAndCeo.length > 0 &&
    hrAndCeo?.find((emp: HrAndCeo) => emp.role === "ceo");

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
          className: "label hr-department",
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
          children: teamLeaders?.map((leader: TeamLeader) => ({
            key: leader._id,
            className: "card prj-card",
            data: {
              image: leader.teamLeaderProfilePhoto,
              name: leader.teamLeaderName,
            },
            children: leader.employees?.map((emp: EmployData) => ({
              key: emp.id,
              className: "card w-card",
              data: {
                image: emp.profilePhoto || "default_employee_image_url",
                name: emp.name,
                title: emp.position,
              },
            })),
          })),
        },
      ],
    },
  ];
  setData(treeNode);
};