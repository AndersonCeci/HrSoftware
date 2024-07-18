import { Button, Dropdown, Form, Input, Modal, TableProps } from "antd";
import Table, {
  createTableColumns,
  getAllUniqueValues,
} from "../components/Table/Table";
import TableHeader from "../components/Table/TableHeader";
import dummydataemployee from "../utils/dummydataemployee";
import { useEffect, useState } from "react";
import type { EmployeeDataType } from "../types/Employee";
import { MoreOutlined } from "@ant-design/icons";
import { ButtonType } from "../enums/Button";
import Select from "../components/Shared/Select";
import CreateEmployeDrawer from "../components/Employment/CreateEmployeeDrawer";

const EmploymentPage: React.FC = () => {
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState<EmployeeDataType[]>([]);
  const [open, setOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState<EmployeeDataType>();


  useEffect(() => {
    setTableData(dummydataemployee);
  }, []);

  const onEditEmployee = (record: EmployeeDataType) => {
    setOpen(true);
    console.log(record, "record");
    // form.setFieldsValue({
    //   name:record.name,
    //   email:record.email,
    //   position: record.position,
    // })

    setEditedEmployee(record);

  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditSubmit = (values: any) => {
    // const updatedTask = {
    //   ...editedEmployee,
    //   ...values,
    // };
    // setTableDate((prev) =>
    //   prev.map((employee) =>
    //     employee.id === editedEmployee.id ? (updatedTask as EmployeeDataType) : employee
    //   )
    // );
    // setIsEditable(false);
  };

  const selectOption = ["Active", "Inactive", "Remote"];
  const columns: TableProps<EmployeeDataType>["columns"] = [
    createTableColumns({
      dataIndex: "name",
      title: "Name",
      key: "name",
      filterDropdown: true,
      onFilter: (inputValue, filter) =>
        filter.name.toLowerCase().includes(inputValue.toLowerCase()),
    }),
    createTableColumns({
      dataIndex: "email",
      title: "E-mail",
      key: "email",
    }),
    createTableColumns({
      dataIndex: "position",
      title: "Position",
      key: "position",
      filters: getAllUniqueValues(tableData, "position"),
      onFilter: (value, record) => record.position.indexOf(value) === 0,
    }),
    createTableColumns({
      dataIndex: "status",
      title: "Status",
      key: "status",
      displayAs: (value) => (
        <Select
          options={selectOption.map((option) => ({
            value: option,
            label: option,
          }))}
          placeholder="Select application phase"
          onChange={(value) => console.log(value)}
          value={value}
        />
      ),
      filters: getAllUniqueValues(tableData, "status"),
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    }),
    createTableColumns({
      title: "Action",
      dataIndex: "id",
      key: "action",
      displayAs: (text, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "Edit",
                label: (
                  <Button
                    type={ButtonType.TEXT}
                    block
                    onClick={() => onEditEmployee(record)}
                  >
                    Edit
                  </Button>
                ),
              },
              {
                key: "Delete",
                label: (
                  <Button
                    type={ButtonType.TEXT}
                    block
                    onClick={() => {}}
                    danger
                  >
                    Delete
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
console.log( editedEmployee, 'stateeeeeeee');
//  console.log(editedEmployee.name?.split(" ")[0], "HELLO JOHN");
  return (
    <section className="test">
      <TableHeader title="Employment" onClick={() => setOpen(true)} />
      <Table columns={columns} data={tableData} />
      <CreateEmployeDrawer open={open} setOpen={setOpen} selectedEmployee={editedEmployee} />
    </section>
  );
};

export default EmploymentPage;
