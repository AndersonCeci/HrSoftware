import { RecrutmentDataType } from "../types/RecruitmentDataTypes";
import { MoreOutlined, SearchOutlined } from "@ant-design/icons";
import { TableProps, Dropdown } from "antd";
import { createTableColumns, getAllUniqueValues } from "../../../components/Table/Table";
import { IoDocumentAttach } from "react-icons/io5";
import Select from "../../../components/Shared/Select";
import Button from "../../../components/Shared/Button";
import { selectOption } from "./constants";
import { Link } from "react-router-dom";

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
		title: "Resume",
		dataIndex: "cv",
		key: "cv",
		displayAs: (value) => (
			<Link to={value} target="_blank" rel="noopener noreferrer">
				<IoDocumentAttach />
			</Link>
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
								label: <Button onClick={() => handleEdit(record)}>Edit</Button>,
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
