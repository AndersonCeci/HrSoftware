import { useState } from "react";
import { ApplicantProps } from "../../../../types/ApplicantProps";
import useHttp from "../../../../hooks/useHttp";
import axios, { AxiosError } from "axios";
import { Form, message } from "antd";
import { RecruitmentStage } from "../../columns/constants";
import { Filters } from "./filter.hook";

const API = import.meta.env.REACT_APP_RECRUITMENT_API;

export const useRecruitment = () => {
  const [tableData, setTableData] = useState<ApplicantProps[]>([]);
  const [editingRecord, setEditingRecord] = useState<ApplicantProps | null>(
    null
  );
  const [drawerState, setDrawerState] = useState<boolean>(false);
  const [isLoading, , sendRequest] = useHttp();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);

  const fetchApplicants = async (
    page: number,
    limit: number,
    filters: Filters
  ) => {
    try {
      const response = await axios.get(API, {
        params: { page, limit, filters },
      });
      const { data, meta } = response.data;
      setTableData(data);
      return meta.itemCount;
    } catch (error) {
      if (error instanceof AxiosError)
        message.error(
          error.message || error.response?.data.errorDetails.message
        );
      message.error("Failed to retrieve applicant");
    }
  };

  const createApplicant = async (newData: ApplicantProps) => {
    try {
      console.log("submitedDate", newData.dateSubmitted);
      const updatedData = { ...newData, stage: RecruitmentStage.Applied };
      const res = await axios.post(API, updatedData);
      handleAddNew(res.data);
      return res;
    } catch (error) {
      if (error instanceof AxiosError)
        message.error(
          error.response?.data.errorDetails.message || error.message
        );
      message.error("Failed to add applicant");
    }
  };

  const handleDelete = (id: string) => {
    sendRequest(useHttp.deleteRequestHelper(`${API}/${id}`));
    setTableData((prevData) =>
      prevData.filter((item: ApplicantProps) => item._id !== id)
    );
  };

  const handleAddNew = (newData: ApplicantProps) => {
    setTableData((prevData) => [newData, ...prevData]);
    setIsEditModalVisible(false);
    message.success(
      `${newData.name} ${newData.surname} added to the applicants successfully`
    );
  };

  const handleEdit = (newData: ApplicantProps) => {
    setTableData((prevData) =>
      prevData.map((item) => (item._id === newData._id ? newData : item))
    );
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
    try {
      const uploadResponse = await fetch("http://localhost:3000/files/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("File upload failed");
      }

      const uploadData = await uploadResponse.json();
      const fileUrl = uploadData.fileUrl;

      form.setFieldsValue({ cv: fileUrl });
      setFile(null);
    } catch (error) {
      console.error("File upload error:", error);
    }
  };

  const updateApplicant = async (
    _id: string,
    values: ApplicantProps,
    step: number
  ) => {
    let updatedValues = {};
    let stage: RecruitmentStage = RecruitmentStage.Applied;

    const { stage: currentStage } = editingRecord || {};

    switch (step) {
      case 0:
        updatedValues = { ...values };
        break;
      case 1:
        if (currentStage === RecruitmentStage.Applied) {
          stage = RecruitmentStage.FirstInterview;
        }
        updatedValues = {
          name: editingRecord?.name,
          surname: editingRecord?.surname,
          stage,
          firstInterview: { ...values },
        };
        break;
      case 2:
        if (currentStage !== RecruitmentStage.OfferMade) {
          stage = RecruitmentStage.SecondInterview;
        }
        updatedValues = {
          name: editingRecord?.name,
          surname: editingRecord?.surname,
          stage,
          secondInterview: { ...values },
        };
        break;
      case 3:
        stage = RecruitmentStage.OfferMade;
        updatedValues = {
          name: editingRecord?.name,
          surname: editingRecord?.surname,
          stage,
          offerMade: { ...values },
        };
        break;
      default:
        message.error("Invalid step");
        return;
    }

    try {
      const res = await axios.patch(`${API}/${_id}`, updatedValues);
      handleEdit(res.data);
      message.success("Applicant updated successfully!");
      return res;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error instanceof AxiosError) {
          const errorMessage =
            error.response?.data?.message?.[0] ||
            error.message ||
            "An error occurred.";
          message.error(errorMessage);
        }
      } else {
        message.error("An unexpected error occurred.");
      }
    }
  };

  const handleFileChange = async () => {
    if (file) {
      console.log(file, "fileeee");
      // handleUpload(file);
    } else {
      message.error("No file chose");
    }
  };

  return {
    createApplicant,
    form,
    tableData,
    editingRecord,
    drawerState,
    setDrawerState,
    isLoading,
    isEditModalVisible,
    handleDelete,
    handleAddNew,
    handleEdit,
    handleEditButtonClick,
    handleOnClose,
    setEditingRecord,
    fetchApplicants,
    handleFileChange,
    setFile,
    handleUpload,
    updateApplicant,
    setTableData,
  };
};
