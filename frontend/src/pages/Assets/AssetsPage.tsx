import Table, { createTableColumns, getAllUniqueValues } from "../../components/Table/Table";
import TableHeader from "../../components/Table/TableHeader";
import Modal from "../../components/Shared/Modal";
import Button from "../../components/Shared/Button";
import AddAssetForm from "./components/AddAssetForm";
import { AssetDatatype } from "./types/AssetsDataType";

import { Modal as AntModal } from "antd";

import { ButtonType } from "../../enums/Button";

import { TableProps, Dropdown } from "antd";
import { MoreOutlined, SearchOutlined } from "@ant-design/icons";

import { useState, useEffect, useRef } from "react";

const AssetsPage: React.FC = () => {
	const [tableData, setTableDate] = useState<AssetDatatype[]>([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const assetModalRef = useRef<HTMLDialogElement>(null);
	useEffect(() => {
		setTableDate([
			{
				id: 1,
				type: "Laptop",
				code: 74,
				date: "2021-08-01",
				employee: "Ilvio Cumani",
			},
			{
				id: 2,
				type: "Monitor",
				code: 75,
				date: "2021-08-08",
				employee: "Joni ",
			},
			{
				id: 3,
				type: "Laptop",
				code: 76,
				date: "2021-08-01",
				employee: "Anderson",
			},
			{
				id: 5,
				type: "Laptop",
				code: 78,
				date: "2021-08-04",
				employee: "Bora",
			},
			{
				id: 4,
				type: "Monitor",
				code: 77,
				date: "2021-08-01",
				employee: "Gerald",
			},
			{
				id: 6,
				type: "KeyBoard",
				code: 79,
				date: "2021-08-02",
				employee: "Nikola",
			},
		]);
	}, []);

	const allAssetTypes = getAllUniqueValues(tableData, "type").map((option) => ({
		value: option.text,
		label: option.text,
	}));

	const columns: TableProps<AssetDatatype>["columns"] = [
		createTableColumns({
			title: "Type",
			dataIndex: "type",
			key: "type",
			filters: getAllUniqueValues(tableData, "type"),
			onFilter: (value, record) => record.type.indexOf(value) === 0,
		}),
		createTableColumns({ title: "Code", dataIndex: "code", key: "code" }),
		createTableColumns({ title: "Date", dataIndex: "date", key: "date" }),
		createTableColumns({
			title: "Employee",
			dataIndex: "employee",
			key: "employee",
			filterDropdown: true,
			filterIcon: <SearchOutlined className="nav-menu-icon" />,
			onFilter: (inputValue, filter) =>
				filter.employee.toLowerCase().includes(inputValue.toLowerCase()),
		}),
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
			<Modal
				isOpen={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				onOk={() => {
					console.log("YES");
				}}
			>
				<AddAssetForm availableOptions={allAssetTypes} />
			</Modal>
			<TableHeader
				title="Assets"
				onClick={() => {
					setIsModalVisible(true);
				}}
			/>
			<Table columns={columns} data={tableData} />
		</section>
	);
};

export default AssetsPage;
