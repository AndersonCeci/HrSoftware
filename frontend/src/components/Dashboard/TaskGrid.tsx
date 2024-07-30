import React, { useState } from "react";
import {
  Tooltip,
  Table,
  Input,
  Select,
  Modal,
  Form,
  DatePicker,
  Button,
} from "antd";
import { PlusOutlined, EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import moment from "moment"
import "../../styles/Dashboard/TaskGrid.css";

const { Option } = Select;
const { Search } = Input;

interface Task {
  id: number;
  title: string;
  description: string;
  due: string;
  status: string;
}

const TaskGrid: React.FC = () => {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  const [dataSource, setDataSource] = useState<Task[]>([]);
  const [searchData, setSearchData] = useState<Task[]>([]);
  const [len, setLen] = useState(0);
  const [isEditable, setIsEditable] = useState(false);
  const [editedTask, setEditedTask] = useState<Partial<Task>>({});
  const [isVisible, setIsVisible] = useState(false);

  const columns: ColumnsType<Task> = [
    {
      key: "1",
      title: "Title",
      dataIndex: "title",
    },
    {
      key: "2",
      title: "Description",
      dataIndex: "description",
      width: "200px",
    },
    {
      key: "3",
      title: "Due Date",
      dataIndex: "due",
      sorter: (a, b) => a.due.localeCompare(b.due),
    },
    {
      key: "4",
      title: "Status",
      dataIndex: "status",
      filters: [
        { text: "TO DO", value: "TO DO" },
        { text: "DOING", value: "DOING" },
        { text: "DONE", value: "DONE" },
      ],
      onFilter: (value, record) => record.status.indexOf(value as string) === 0,
    },
    {
      key: "7",
      title: "Actions",
      render: (record) => (
        <>
          <EditTwoTone
            onClick={() => {
              onEditTask(record);
            }}
          />
          <DeleteTwoTone
            onClick={() => {
              onDeleteTask(record);
            }}
            style={{ marginLeft: "18px" }}
            twoToneColor="red"
          />
        </>
      ),
    },
  ];

  const onAddTask = () => {
    setIsVisible(true);
  };

  const onDeleteTask = (record: Task) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this task?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((prev) => prev.filter((task) => task.id !== record.id));
        setSearchData((prev) => prev.filter((task) => task.id !== record.id));
      },
    });
  };

  const onEditTask = (record: Task) => {
    form.setFieldsValue({
      title: record.title,
      description: record.description,
      due: moment(record.due, "MM/DD/YYYY"),
      status: record.status,
    });

    setEditedTask(record);
    setIsEditable(true);
  };

  const statusOptions = [
    { label: "TO DO", value: "TO DO" },
    { label: "DOING", value: "DOING" },
    { label: "DONE", value: "DONE" },
  ];

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setLen(searchTerm.length);
    if (searchTerm.length > 0) {
      const reg = new RegExp(searchTerm, "i");
      const filterData = dataSource.filter((e) => reg.test(e.title));
      setSearchData(filterData.length > 0 ? filterData : []);
    } else {
      setSearchData(dataSource);
    }
  };

  const final = len > 0 ? searchData : dataSource;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (values: any) => {
    setIsVisible(false);
    const newTask = {
      ...values,
      id: dataSource.length + 1,
      due: values.due ? values.due.format("MM/DD/YYYY") : undefined,
    };

    setDataSource((prev) => [...prev, newTask]);
    form2.resetFields();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditSubmit = (values: any) => {
    const updatedTask = {
      ...editedTask,
      ...values,
      due: values.due ? values.due.format("MM/DD/YYYY") : editedTask.due,
    };

    setDataSource((prev) =>
      prev.map((task) =>
        task.id === editedTask.id ? (updatedTask as Task) : task
      )
    );
    setIsEditable(false);
  };

  return (
    <div className="container">
      <div className="header-container">
        <h1 className="task-title">Task List</h1>
        <Search
          onChange={onSearch}
          placeholder="Search a task"
          allowClear
          style={{ width: 300 }}
        />
        <Tooltip placement="bottom" title="Add new">
          <button onClick={onAddTask} className="add-btn">
            <PlusOutlined />
          </button>
        </Tooltip>
      </div>
      <Table
        pagination={{ pageSize: 10 }}
        columns={columns}
        dataSource={final}
        locale={{
          emptyText: "No tasks available",
        }}
      />
      <Modal
      footer={null}
        className="Edit-modal"
        title="Edit Task"
        open={isEditable}
        onCancel={() => {
          setIsEditable(false);
          setEditedTask({});
        }}
      >
        <Form form={form} layout="vertical" onFinish={handleEditSubmit}>
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: "Please enter the title" },
              { max: 100 },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>
          <Form.Item
            label="Due Date"
            name="due"
            rules={[
              {
                validator: (_, value) => {
                  if (value && value < moment().startOf("day")) {
                    return Promise.reject(
                      new Error("Due date cannot be earlier than today")
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <DatePicker format={"MM/DD/YYYY"} />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please choose the status" }]}
          >
            <Select placeholder="Select status">
              {statusOptions.map((status) => (
                <Option key={status.value} value={status.value}>
                  {status.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button className="Submit-btn" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        open={isVisible}
        footer={null}
        onCancel={() => {
          setIsVisible(false);
        }}
        title="Add New Task"
      >
        <Form form={form2} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: "Please enter the title" },
              { max: 100 },
            ]}
          >
            <Input placeholder="Enter the title" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please enter the description" },
              { max: 1000 },
            ]}
          >
            <Input.TextArea placeholder="Enter the description" />
          </Form.Item>
          <Form.Item
            label="Due Date"
            name="due"
            rules={[
              {
                validator: (_, value) => {
                  if (value && value < moment().startOf("day")) {
                    return Promise.reject(
                      new Error("Due date cannot be earlier than today")
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <DatePicker format={"MM/DD/YYYY"} />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            initialValue="TO DO"
            rules={[{ required: true, message: "Please choose the status" }]}
          >
            <Select placeholder="Select status">
              {statusOptions.map((status) => (
                <Option key={status.value} value={status.value}>
                  {status.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button className="Submit-btn" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TaskGrid;
