import { TreeNode } from "primereact/treenode";

export const nodeTemplate = (node: TreeNode) => {
  if (node.className?.includes("card")) {
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
  if (node.className?.includes("label")) {
    return (
      <div className="flex-label label">
        <span className="font-bold mb-2">{node.data.name}</span>
      </div>
    );
  }
  return node.label || null;
};