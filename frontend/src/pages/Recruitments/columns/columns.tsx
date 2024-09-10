import { EditOutlined } from "@ant-design/icons";
import { TableProps } from "antd";
import { createTableColumns } from "../../../components/Table/Table";
import { IoDocumentAttach } from "react-icons/io5";
import Button from "../../../components/Shared/Button";
import { selectOption } from "./constants";
import { Tag } from "antd";

import { Link } from "react-router-dom";
import { ButtonType } from "../../../enums/Button";
import { ApplicantProps } from "../../../types/ApplicantProps";
import { Dispatch, SetStateAction } from "react";
import { Col, Row, Tooltip } from "antd/lib";

type GenerateColumnsParams = {
  tableData: ApplicantProps[];
  setDrawerState: Dispatch<SetStateAction<boolean>>;
  setEditingRecord: Dispatch<SetStateAction<ApplicantProps | null>>;
};

export const columns = ({
  tableData,
  setDrawerState,
  setEditingRecord,
}: GenerateColumnsParams): TableProps<ApplicantProps>["columns"] => [
  createTableColumns({
    title: "Applicant",
    dataIndex: "_id",
    key: "_id",
    width: "70px",
    displayAs: (record) => {
      const applicant = tableData.find((applicant) => applicant._id === record);
      return (
        <span>
          {applicant?.name} {applicant?.surname}
        </span>
      );
    },
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
    width: "70px",
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
    align: "center",
    width: 60,
    onFilter: (value, record) => record.stage.indexOf(value) === 0,
  }),
  createTableColumns({
    title: "Date Submitted",
    dataIndex: "submittedDate",
    key: "submittedDate",
    width: "70px",
    displayAs: (value) => (
      <span>
        {new Date(value).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </span>
    ),
  }),

  createTableColumns({
    title: "Reference",
    dataIndex: "reference",
    key: "reference",
    width: "70px",
  }),

  createTableColumns({
    title: "More",
    dataIndex: "_id",
    key: "action",
    displayAs: (record) => {
      const applicant = tableData.find((applicant) => applicant._id === record);
      return (
        <>
          <Row gutter={15} justify={"center"}>
            <Col>
              <Tooltip title="Edit applicant" color="cyan">
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
              </Tooltip>
            </Col>
          </Row>
        </>
      );
    },
    fixed: "right",
    align: "center",
    width: 30,
  }),
];
