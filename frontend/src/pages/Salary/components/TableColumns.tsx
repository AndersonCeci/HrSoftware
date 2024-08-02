import { Button, Checkbox, Dropdown } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { createTableColumns } from "../../../components/Table/Table";
import { ButtonType } from "../../../enums/Button";
import { capitalizeFirstLetter, getMonthName } from "../../../utils/generals";

interface ColumnsParams {
  handleAddBonus: (employeeID: string) => void;
  handleModal: (employeeID: string) => void;
  tableData: any;
}

const columns = ({ handleAddBonus, handleModal }: ColumnsParams) => [
  createTableColumns({
    dataIndex: "employeeDetails",
    title: "Employee Details",
    key: "employeeDetails",
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
    key: "dateTaken",
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
    dataIndex: "paid",
    title: "Compensated",
    key: "paid",
    displayAs: (paid: boolean) => {
      const newPaid = paid;
      return (
        <Checkbox
          checked={newPaid}
          onChange={() => {
            newPaid === !newPaid;
          }}
        ></Checkbox>
      );
    },
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
                  style={{width:"80px"}}
                    type={ButtonType.TEXT}
                    onClick={() => {
                      handleAddBonus(salaryID);
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
                  style={{width:"80px", alignItems:"center"}}
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
