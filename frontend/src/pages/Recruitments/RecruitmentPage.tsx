import Table, {
  createTableColumns,
  getAllUniqueValues,
} from "../../components/Table/Table";
import Select from "../../components/Shared/Select";
import Button from "../../components/Shared/Button";
import TableHeader from "../../components/Table/TableHeader";
import { MoreOutlined, SearchOutlined } from "@ant-design/icons";
import { TableProps, Dropdown, Form } from "antd";
import type { RecrutmentDataType } from "../../types/Recrutment";
import { useEffect, useState } from "react";
import TableModal from "./components/TableModal";
import { IoDocumentAttach } from "react-icons/io5";

const RecruitmentPage: React.FC = () => {
  const [tableData, setTableData] = useState<RecrutmentDataType[]>([]);
  const [editingRecord, setEditingRecord] = useState<RecrutmentDataType | null>(
    null
  );
  const [form] = Form.useForm();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  console.log(editingRecord, "editinggggRecorddd");
  useEffect(() => {
    const fetchRecruitments = async () => {
      try {
        const response = await fetch("http://localhost:3000/recruiments", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTableData(data);
      } catch (error) {
        console.error("Error fetching recruitments:", error);
      }
    };

    fetchRecruitments();
  }, []);

  const selectOption = [
    "Applied",
    "Rejected",
    "1st Interview",
    "2nd Interview",
    "Offer Made",
  ];

  const handleEdit = (record: RecrutmentDataType) => {
    setEditingRecord(record);
    setIsEditModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      console.log(id, "iddd");
      const response = await fetch(`http://localhost:3000/recruiments/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setTableData((prevData) =>
        prevData.filter((item: RecrutmentDataType) => item._id !== id)
      );
    } catch (error) {
      console.error("Error deleting recruitment:", error);
    }
  };

  const columns: TableProps<RecrutmentDataType>["columns"] = [
    createTableColumns({
      title: "Name",
      dataIndex: "name",
      key: "name",
      filterDropdown: true,
      filterIcon: <SearchOutlined className="nav-menu-icon" />,
      onFilter: (inputValue, filter) =>
        filter.name.toLowerCase().includes(inputValue.toLowerCase()),
    }),
    createTableColumns({
      title: "Resume",
      dataIndex: "cv",
      key: "cv",
      displayAs: (value) => (
        <IoDocumentAttach onClick={() => console.log(value)} />
      ),
    }),
    createTableColumns({
      title: "Position",
      dataIndex: "position",
      key: "position",
      filters: getAllUniqueValues(tableData, "position"),
      onFilter: (value, record) => record.position.indexOf(value) === 0,
    }),
    createTableColumns({
      title: "Application Phase",
      dataIndex: "stage",
      key: "stage",
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
      filters: getAllUniqueValues(tableData, "applicationPhase"),
      onFilter: (value, record) => record.applicationPhase.indexOf(value) === 0,
    }),
    createTableColumns({
      title: "Date Submitted",
      dataIndex: "dateSubmitted",
      key: "dateSubmitted",
    }),
    createTableColumns({
      title: "Reference",
      dataIndex: "reference",
      key: "reference",
    }),
    createTableColumns({ title: "Email", dataIndex: "email", key: "email" }),
    createTableColumns({
      title: "Action",
      dataIndex: "_id",
      key: "action",
      displayAs: (text, record) => {
        return (
          <Dropdown
            menu={{
              items: [
                {
                  key: "Edit",
                  label: (
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                  ),
                },
                {
                  key: "Delete",
                  label: (
                    <Button danger onClick={() => handleDelete(record._id)}>
                      Delete
                    </Button>
                  ),
                },
              ],
            }}
            trigger={["click"]}
          >
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        );
      },
      fixed: "right",
      width: 30,
    }),
  ];

  const handleSubmit = async (values: RecrutmentDataType) => {
    try {
      const url = editingRecord
        ? `http://localhost:3000/recruiments/${editingRecord._id}`
        : "http://localhost:3000/recruiments";
      const method = editingRecord ? "PATCH" : "POST";
      console.log(method, "methodd");
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const newData = await response.json();
        setTableData((prevData) =>
          editingRecord
            ? prevData.map((item) =>
                item._id === editingRecord._id ? newData : item
              )
            : [...prevData, newData]
        );
      } else {
        console.error(
          `Failed to ${editingRecord ? "update" : "create"} recruitment`
        );
      }
    } catch (error) {
      console.error(
        `Error ${editingRecord ? "updating" : "creating"} recruitment:`,
        error
      );
    } finally {
      setIsEditModalVisible(false);
      setEditingRecord(null);
      form.resetFields();
    }
  };

  const handleOnClose = () => {
    setIsEditModalVisible(false);
  };

  const handleUploadFile = (e) =>
  {
    console.log(e, 'fileeeee')
  }

  return (
    <section className="test">
      <TableHeader
        title="Recrutment"
        onClick={() => setIsEditModalVisible(true)}
      />
      <Table columns={columns} data={tableData} fixed />
      <TableModal
        open={ isEditModalVisible }
        onClose={ handleOnClose }
        onSubmit={ handleSubmit }
        data={ editingRecord }
        options={ selectOption.map( ( option ) => ( {
          value: option,
          label: option,
        } ) ) }
        modalTitle={ editingRecord ? "Edit Recruitment" : "Create New Recruitment" }
        handleUploadFile={handleUploadFile}  />
    </section>
  );
};

export default RecruitmentPage;
