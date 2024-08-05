import { RecrutmentDataType } from "../types/RecruitmentDataTypes";
import { MoreOutlined, SearchOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { TableProps, Dropdown } from "antd";
import { createTableColumns, getAllUniqueValues } from "../../../components/Table/Table";
import { IoDocumentAttach } from "react-icons/io5";
import Button from "../../../components/Shared/Button";
import { selectOption } from "./constants";
import { Tag } from "antd";

import { Link } from "react-router-dom";
import { ButtonType } from "../../../enums/Button";

type GenerateColumnsParams = {
	tableData: RecrutmentDataType[];
	handleEdit: (record: RecrutmentDataType) => void;
	handleDelete: (id: string) => void;
};

export const columns = ({
	tableData,
	handleEdit,
	handleDelete,
}: GenerateColumnsParams): TableProps<RecrutmentDataType>["columns"] => [
	createTableColumns({
		title: "Name",
		dataIndex: "name",
		key: "name",
		filterDropdown: true,
		filterIcon: <SearchOutlined className="nav-menu-icon" />,
		onFilter: (inputValue, filter) => filter.name.toLowerCase().includes(inputValue.toLowerCase()),
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
					<Button size="large" type={ButtonType.LINK} icon={<IoDocumentAttach />}>
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
			<Tag color={selectOption.find((item) => item.label === value)?.color || "cyan"}>{value}</Tag>
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
									<Button
										type={ButtonType.TEXT}
										block
										icon={<EditOutlined />}
										onClick={() => handleEdit(record)}
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
										danger
										icon={<DeleteOutlined />}
										onClick={() => handleDelete(record._id)}
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
			);
		},
		fixed: "right",
		align: "center",
		width: 35,
	}),
];
