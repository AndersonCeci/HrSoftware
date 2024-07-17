import Table, {
  createTableColumns,
  getAllUniqueValues,
} from "../../components/Table/Table";
import Select from "../../components/Shared/Select";
import Button from "../../components/Shared/Button";
import TableHeader from "../../components/Table/TableHeader";
import { MoreOutlined, SearchOutlined } from "@ant-design/icons";
import { TableProps, Dropdown } from "antd";
import type { RecrutmentDataType } from "../../types/Recrutment";
import { useEffect, useState } from "react";
import TableModal from "./components/TableModal";

const RecruitmentPage: React.FC = () => {
  const [tableData, setTableData] = useState<RecrutmentDataType[]>([]);
  const [editingRecord, setEditingRecord] = useState<RecrutmentDataType | null>(
    null
  );
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

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
    "First Interview",
    "Second Interview",
    "Final Interview",
    "Applied",
    "Offer Made",
  ];

  const handleEdit = ( record: RecrutmentDataType ) =>
  {
    console.log(record, 'recordd')
    setEditingRecord(record);
    setIsEditModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
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
        prevData.filter((item: RecrutmentDataType) => item.id !== id)
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
      title: "Position",
      dataIndex: "position",
      key: "position",
      filters: getAllUniqueValues(tableData, "position"),
      onFilter: (value, record) => record.position.indexOf(value) === 0,
    }),
    createTableColumns({
      title: "Application Phase",
      dataIndex: "applicationPhase",
      key: "applicationPhase",
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
      displayAs: (record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "Edit",
                label: <Button onClick={() => handleEdit(record)}>Edit</Button>,
              },
              {
                key: "Delete",
                label: (
                  <Button danger onClick={() => handleDelete(record)}>
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
      ),
      fixed: "right",
      width: 30,
    }),
  ];
  return (
    <section className="test">
      <TableHeader title="Recrutment" />
      <Table columns={columns} data={tableData} fixed />
      <TableModal
        open={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        onSubmit={() => console.log("testt")}
        data={editingRecord}
        options={selectOption.map((option) => ({
          value: option,
          label: option,
        }))}
        modalTitle={"Edit Recruitment"}
      />
    </section>
  );
};

export default RecruitmentPage;
