import { Button, Dropdown } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { createTableColumns } from "../../../components/Table/Table";
import { ButtonType } from "../../../enums/Button";

interface ColumnsParams {
  handleAddBonus: (employeeID: string) => void;
  handleEdit: (employeeID: string) => void;
}

const columns = ({ handleAddBonus, handleEdit }: ColumnsParams) => [
  createTableColumns({
    dataIndex: "employeeID",
    title: "ID",
    key: "id",
  }),
  createTableColumns({
    dataIndex: "NSSH",
    title: "NSSH",
    key: "NSSH",
  }),
  createTableColumns({
    dataIndex: "netSalary",
    title: "Net Salary",
    key: "netSal",
  }),
  createTableColumns({
    dataIndex: "workDays",
    title: "Work Days",
    key: "workDays",
  }),
  createTableColumns({
    dataIndex: "healthInsurance",
    title: "Health Insurance",
    key: "healthInsurance",
  }),
  createTableColumns({
    dataIndex: "socialSecurityContributions",
    title: "Social Security Contributions",
    key: "socialSecurityContributions",
  }),
  createTableColumns({
    dataIndex: "bonuses",
    title: "Bonuses Total",
    key: "bonuses",
    displayAs: (bonuses: { desc: string; amount: number }[]) => {
      const totalBonuses = bonuses.reduce(
        (acc, bonus) => acc + bonus.amount,
        0
      );
      return <span>{totalBonuses}</span>;
    },
  }),
  createTableColumns({
    dataIndex: "grossSalary",
    title: "Gross Salary",
    key: "grossSalary",
  }),
  createTableColumns({
    dataIndex: "total",
    title: "Total",
    key: "total",
  }),
  createTableColumns({
    title: "Action",
    dataIndex: "employeeID",
    key: "action",
    displayAs: (employeeID: string) => (
      <Dropdown
        menu={{
          items: [
            {
              key: "Add Bonus",
              label: (
                <Button
                  type={ButtonType.TEXT}
                  onClick={() => {
                    handleAddBonus(employeeID);
                  }}
                >
                  Add Bonus
                </Button>
              ),
            },
            {
              key: "Edit",
              label: (
                <Button
                  type={ButtonType.TEXT}
                  onClick={() => handleEdit(employeeID)}
                >
                  Edit
                </Button>
              ),
            },
          ],
        }}
        trigger={["click"]}
      >
        <Button type={ButtonType.TEXT} icon={<MoreOutlined />} />
      </Dropdown>
    ),
    fixed: "right",
    width: 30,
  }),
];

export default columns;
