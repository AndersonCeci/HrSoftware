import { Button, Dropdown, Table, TableColumnsType } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { createTableColumns } from "../../../components/Table/Table";
import { ButtonType } from "../../../enums/Button";
import { capitalizeFirstLetter, getMonthName } from "../../../utils/generals";

interface ColumnsParams {
  handleAddBonus: (employeeID: string) => void;
  handleModal: (employeeID: string) => void;
  tableData: any[];
}

const columns = ({ handleAddBonus, handleModal }: ColumnsParams) => [
  createTableColumns({
    dataIndex: "employeeDetails",
    title: "Employee Details",
    key: "_id",
    displayAs: (employeeDetails) => {
      if (!employeeDetails) {
        return <span>No Details</span>;
      }
      return (
        <span>
          {capitalizeFirstLetter(employeeDetails.name)}{" "}
          {capitalizeFirstLetter(employeeDetails.surname)}
        </span>
      );
    },
  }),
  createTableColumns({
    dataIndex: "dateTaken",
    title: "Date Taken",
    key: "_id",
    displayAs: (dateTaken) => {
      const dateObj = new Date(dateTaken);
      if (dateObj instanceof Date && !isNaN(dateObj.getTime())) {
        const year = dateObj.getFullYear();
        const monthName = getMonthName(dateObj);
        return <span style={{ width: "200px" }}>{`${monthName} ${year}`}</span>;
      }
      return <span>Invalid Date</span>;
    },
  }),
  createTableColumns({
    dataIndex: "netSalary",
    title: "Net Salary",
    key: "_id",
  }),

  createTableColumns({
    dataIndex: "workDays",
    title: "Work Days",
    key: "_id",
  }),
  createTableColumns({
    dataIndex: "bonuses",
    title: "Bonuses Total",
    key: "_id",
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
    key: "_id",
  }),
  createTableColumns({
    dataIndex: "total",
    title: "Total",
    key: "_id",
  }),
  createTableColumns({
    title: "Action",
    dataIndex: "_id",
    key: "action",
    displayAs: (salaryID: string) => {
      return (
        <Dropdown
          menu={{
            items: [
              {
                key: "Add Bonus",
                label: (
                  <Button
                    style={{ width: "80px" }}
                    type={ButtonType.TEXT}
                    onClick={() => handleAddBonus(salaryID)}
                  >
                    Add Bonus
                  </Button>
                ),
              },
              {
                key: "Edit",
                label: (
                  <Button
                    style={{ width: "80px", alignItems: "center" }}
                    type={ButtonType.TEXT}
                    onClick={() => handleModal(salaryID)}
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
      );
    },
    fixed: "right",
    width: 40,
  }),
];

export default columns;

export const expandedRowRender = (record: any) => {
  const columns: TableColumnsType<any> = [
    {
      title: "Tax Income",
      dataIndex: "taxIncome",
      key: "_id",
      render: (data: any) => {
        if (data) {
          return <span>data</span>;
        }
        return <span>0</span>;
      },
    },
    {
      title: "Social Security Contributions",
      dataIndex: "socialSecurityContributions",
      key: "_id",
    },
    {
      title: "Health Insurance",
      dataIndex: "healthInsurance",
      key: "_id",
    },
    {
      title: "Health Insurance Company",
      dataIndex: "healthInsuranceCompany",
      key: "_id",
    },
    {
      title: "Social Insurance Company",
      dataIndex: "socialInsuranceCompany",
      key: "_id",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={[record]}
      pagination={false}
      style={{ margin: "0px" }}
    />
  );
};
