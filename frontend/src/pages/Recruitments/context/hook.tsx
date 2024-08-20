import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ApplicantProps } from "../../../types/ApplicantProps";
import useHttp from "../../../hooks/useHttp";
import axios, { AxiosError } from "axios";
import { message } from "antd";

const API = import.meta.env.REACT_APP_RECRUITMENT_API;

export const useRecruitment = () => {
  const { t } = useTranslation();
  const [tableData, setTableData] = useState<ApplicantProps[]>([]);
  const [editingRecord, setEditingRecord] = useState<ApplicantProps | null>(
    null
  );
  const [drawerState, setDrawerState] = useState<boolean>(false);
  const [isLoading, , sendRequest] = useHttp();
  const formRef = useRef<any>();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  useEffect(() => {
    sendRequest({ url: API }, (data) => {
      setTableData(data);
    });
  }, []);
  const fetchApplicant = async (id: string) => {
    try {
      return await axios.get(API, {
        params: { id },
      });
    } catch (error) {
      if (error instanceof AxiosError)
        message.error(
          error.response?.data.errorDetails.message || error.message
        );
      message.error("Failed to retrieve applicant");
    }
  };

  const handleDelete = (id: string) => {
    sendRequest(useHttp.deleteRequestHelper(`${API}/${id}`));
    setTableData((prevData) =>
      prevData.filter((item: ApplicantProps) => item._id !== id)
    );
  };

  const handleAddNew = (newData: ApplicantProps) => {
    setTableData((prevData) => [...prevData, newData]);
    setIsEditModalVisible(false);
  };

  const handleEdit = (newData: ApplicantProps) => {
    setTableData((prevData) =>
      prevData.map((item) => (item._id === newData._id ? newData : item))
    );
    setIsEditModalVisible(false);
  };

  const handleEditButtonClick = (record: ApplicantProps) => {
    setEditingRecord(record);
    setIsEditModalVisible(true);
  };

  const handleOnClose = () => {
    setIsEditModalVisible(false);
    setEditingRecord(null);
  };
  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData, "formDataaa");
    try {
      const uploadResponse = await fetch("http://localhost:3000/files/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("File upload failed");
      }

      // const uploadData = await uploadResponse.json();
      // const fileUrl = uploadData.fileUrl;

      // form.setFieldsValue({ cv: fileUrl });
      // setFile(file);
    } catch (error) {
      console.error("File upload error:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file, "fileeee");
    if (file) {
      handleUpload(file);
    }
  };
  return {
    t,
    tableData,
    editingRecord,
    drawerState,
    setDrawerState,
    isLoading,
    formRef,
    isEditModalVisible,
    handleDelete,
    handleAddNew,
    handleEdit,
    handleEditButtonClick,
    handleOnClose,
    setEditingRecord,
    fetchApplicant,
    handleFileChange,
  };
};
