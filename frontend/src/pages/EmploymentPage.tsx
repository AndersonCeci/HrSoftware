import { Button, Dropdown, Form, Input, TableProps } from "antd";
import Table, {
  createTableColumns,
  getAllUniqueValues,
  //   getAllUniqueValues,
} from "../components/Table/Table";
import TableHeader from "../components/Table/TableHeader";
import dummydataemployee from "../utils/dummydataemployee";
import { useEffect, useState, useRef } from "react";
import type { EmployeeDataType } from "../types/Employee";
import { MoreOutlined } from "@ant-design/icons";
import { ButtonType } from "../enums/Button";
import Select from "../components/Shared/Select";
import Modal from "../components/Shared/Modal";

const EmploymentPage: React.FC = () => {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  //   const [dataSource, setDataSource] = useState<EmployeeDataType[]>([]);
  const [tableData, setTableDate] = useState<EmployeeDataType[]>([]);
  const [isEditable, setIsEditable] = useState(false);
  const addWorkerFormRef = useRef()
  const [editedInfo, setEditedInfo] = useState<Partial<EmployeeDataType>>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTableDate(dummydataemployee);
  }, []);

  const onEditInfo = (record: EmployeeDataType) => {
    form.setFieldsValue({
      name: record.name,
      email: record.email,
      position: record.position,
      status: record.status,
    });

    setEditedInfo(record);
    setIsEditable(true);
  };

  const handleAdd = () => {
    setIsVisible(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (values: any) => {
    setIsVisible(false);
    const newInfo = {
      ...values,
      id: tableData.length + 1,
    };

    setTableDate((prev) => [...prev, newInfo]);
    form.resetFields();
  };

  const onDeleteInfo = (record: EmployeeDataType) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this employee?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setTableDate((prev) => prev.filter((info) => info.id !== record.id));
      },
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditSubmit = (values: any) => {
    const updatedInfo = {
      ...editedInfo,
      ...values,
    };

    setTableDate((prev) =>
      prev.map((info) =>
        info.id === editedInfo.id ? (updatedInfo as EmployeeDataType) : info
      )
    );
    setIsEditable(false);
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
      dataIndex: "action",
      key: "action",
      displayAs: (record: EmployeeDataType) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "Edit",
                label: (
                  <Button
                    type={ButtonType.TEXT}
                    onClick={() => {
                      onEditInfo(record);
                    }}
                  >
                    {" "}
                    Edit{" "}
                  </Button>
                ),
              },
              {
                key: "Delete",
                label: (
                  <Button
                    type={ButtonType.TEXT}
                    onClick={() => {
                      onDeleteInfo(record);
                    }}
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

  const position = [
	{label: "Frontend",
		value:"frontend"
	}
  ]

  return (
    <section className="test">
      <TableHeader title="Employment" onClick={handleAdd} />
      <Table columns={columns} data={tableData} fixed />
      <Modal
        onOk={() => addWorkerFormRef.current.submit()}
		isOpen={isVisible}
		onCancel={() => setIsVisible(false)}
      >
        <Form ref={addWorkerFormRef} form={form2} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input size="large" placeholder="Enter the name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter an email" }]}
          >
            <Input size="large" placeholder="Enter an email" />
          </Form.Item>
          <Form.Item
            label="Position"
            name="position"
            rules={[{ required: true, message: "Plese enter an position" }]}
          >
            <Select
              options={position}
              placeholder=""
              value={"test"}
              onChange={() => console.log("test")}
            />
          </Form.Item>
        </Form>
      </Modal>
    </section>
  );
};

export default EmploymentPage;
