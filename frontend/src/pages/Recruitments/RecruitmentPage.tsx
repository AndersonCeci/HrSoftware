import Table from "../../components/Table/Table";
import { columns as generateColumns } from "./columns/columns";
import TableHeader from "../../components/Table/TableHeader";
import { Form } from "antd";
import type { RecrutmentDataType } from "../../types/Recrutment";
import { useEffect, useState } from "react";
import TableModal from "./components/TableModal";
import { selectOption } from "./columns/constants";
import { useTranslation } from "react-i18next";

const RecruitmentPage: React.FC = () =>
{
  const { t } = useTranslation();
  const [tableData, setTableData] = useState<RecrutmentDataType[]>([]);
  const [editingRecord, setEditingRecord] = useState<RecrutmentDataType | null>(
    null
  );
  const [form] = Form.useForm();
  const [ isEditModalVisible, setIsEditModalVisible ] = useState( false );
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

  const columns = generateColumns({
    tableData,
    handleEdit: (record: RecrutmentDataType) => handleEdit(record),
    handleDelete: (id: string) => handleDelete(id),
  });

  const handleEdit = (record: RecrutmentDataType) => {
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
        prevData.filter((item: RecrutmentDataType) => item._id !== id)
      );
    } catch (error) {
      console.error("Error deleting recruitment:", error);
    }
  };

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
    } finally {
      setIsEditModalVisible(false);
      setEditingRecord(null);
      form.resetFields();
    }
  };

  const handleOnClose = () => {
    setIsEditModalVisible(false);
  };

  return (
    <section className="test">
      <TableHeader
        title={t("recruitmentTitle")}
        onClick={() => setIsEditModalVisible(true)}
      />
      <Table columns={columns} data={tableData} fixed />
      <TableModal
        open={isEditModalVisible}
        onClose={handleOnClose}
        onSubmit={handleSubmit}
        data={editingRecord}
        options={selectOption.map((option) => ({
          value: option,
          label: option,
        }))}
        modalTitle={
          editingRecord ? "Edit Recruitment" : "Create New Recruitment"
        }
      />
    </section>
  );
};

export default RecruitmentPage;
