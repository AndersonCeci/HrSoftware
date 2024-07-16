import Table, { createTableColumns, getAllUniqueValues } from "../components/Table/Table";
import Select from "../components/Shared/Select";
import Button from "../components/Shared/Button";
import TableHeader from "../components/Table/TableHeader";
import { ButtonType } from "../enums/Button";

import { MoreOutlined, SearchOutlined  } from "@ant-design/icons";
import { TableProps, Dropdown } from "antd";

import type { RecrutmentDataType } from "../types/Recrutment";

import { useEffect, useState } from "react";

import DummyuRecruitmentData from "../utils/DUMMYDATARECRUOTMENT";

const RecruitmentPage: React.FC = () => {
	const [tableData, setTableDate] = useState<RecrutmentDataType[]>([]);

	useEffect(() => {
		setTableDate(DummyuRecruitmentData);
	}, []);

	const selectOption = [
		"First Interview",
		"Second Interview",
		"Final Interview",
		"Applied",
		"Offer Made",
	];

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
					options={selectOption.map((option) => ({ value: option, label: option }))}
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
		createTableColumns({ title: "Reference", dataIndex: "reference", key: "reference" }),
		createTableColumns({ title: "Email", dataIndex: "email", key: "email" }),
		createTableColumns({
			title: "Action",
			dataIndex: "action",
			key: "action",
			displayAs: () => (
				<Dropdown
					menu={{
						items: [
							{ key: "Edit", label: <Button type={ButtonType.TEXT}> Edit </Button> },
							{
								key: "Delete",
								label: (
									<Button type={ButtonType.TEXT} danger>
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
			),
			fixed: "right",
			width: 30,
		}),
	];
	return (
		<section className="test">
			<TableHeader title="Recrutment"/>
			<Table columns={columns} data={tableData} fixed />
		</section>
	);
};

export default RecruitmentPage;
