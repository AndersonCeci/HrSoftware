import { SearchOutlined, EditOutlined } from "@ant-design/icons";
import { TableProps } from "antd";
import {
  createTableColumns,
  getAllUniqueValues,
} from "../../../components/Table/Table";
import { IoDocumentAttach } from "react-icons/io5";
import Button from "../../../components/Shared/Button";
import { selectOption } from "./constants";
import { Tag } from "antd";

import { Link } from "react-router-dom";
import { ButtonType } from "../../../enums/Button";
import { ApplicantProps } from "../../../types/ApplicantProps";
import { Dispatch, SetStateAction } from "react";

type GenerateColumnsParams = {
  tableData: ApplicantProps[];
  setDrawerState: Dispatch<SetStateAction<boolean>>;
  setEditingRecord: Dispatch<SetStateAction<ApplicantProps | null>>;
  fetchApplicant: any;
};

export const columns = ({
  tableData,
  setDrawerState,
  setEditingRecord,
}: GenerateColumnsParams): TableProps<ApplicantProps>["columns"] => [
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
    title: "Surname",
    dataIndex: "surname",
    key: "surname",
  }),
  createTableColumns({ title: "Email", dataIndex: "email", key: "email" }),
  createTableColumns({
    title: "Resume",
    dataIndex: "cv",
    key: "cv",
    displayAs: (value) =>
      value ? (
        <Link to={value} target="_blank" rel="noopener noreferrer">
          <Button
            size="large"
            type={ButtonType.LINK}
            icon={<IoDocumentAttach />}
          >
            <span> View </span>
          </Button>
        </Link>
      ) : (
        <span>No File</span>
      ),

    align: "center",
    width: 60,
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
      <Tag
        color={
          selectOption.find((item) => item.label === value)?.color || "cyan"
        }
      >
        {value}
      </Tag>
    ),
    filters: getAllUniqueValues(tableData, "stage"),
    align: "center",
    width: 60,
    onFilter: (value, record) => record.stage.indexOf(value) === 0,
  }),
  createTableColumns({
    title: "Date Submitted",
    dataIndex: "submittedDate",
    key: "submittedDate",
    displayAs: (value) => <span>{new Date(value).toLocaleDateString()}</span>,
  }),
  createTableColumns({
    title: "Reference",
    dataIndex: "reference",
    key: "reference",
  }),

  createTableColumns({
    title: "More",
    dataIndex: "_id",
    key: "action",
    displayAs: (record) => {
      const applicant = tableData.find((applicant) => applicant._id === record);
      console.log("testtststst", record);
      return (
        <Button
          type={ButtonType.TEXT}
          block
          icon={<EditOutlined />}
          onClick={() => {
            if (applicant) {
              setEditingRecord(applicant);
              setDrawerState(true);
            } else {
              setEditingRecord(null);
            }
          }}
        ></Button>
      );
    },
    fixed: "right",
    align: "center",
    width: 35,
  }),
];
