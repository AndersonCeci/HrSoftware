import { Table as T, Input } from "antd";
import "../../styles/Table/Table.css";
import type { TablePropsType, createTableColumns } from "../../types/Table";

export function getAllUniqueValues(array: any[], key: string) {
	const uniqueValues = array
		.map((data) => data[key])
		.filter((value, index, self) => self.indexOf(value) === index);

	return uniqueValues.map((option) => ({
		text: option,
		value: option,
	}));
}

export function createTableColumns({
	title,
	dataIndex,
	key,
	fixed,
	displayAs,
	width = 90,
	align = "center",
	filters,
	filterSearch,
	filterIcon,
	filterDropdown = false,
	onFilter,
}: createTableColumns) {
	return {
		title: title,
		dataIndex: dataIndex,
		key: key,
		render: (text: any, record: any) => (displayAs ? displayAs(text, record) : text),
		fixed: fixed,
		width: width,
		align: align,
		filters: filters,
		filterSearch: filterSearch,
		filterDropdown: filterDropdown ? ({ setSelectedKeys, selectedKeys, confirm } : any) => (
			<Input
				autoFocus
				placeholder="Search name"
				value={selectedKeys[0]}
				size="large"
				onChange={(e) => {
					setSelectedKeys(e.target.value ? [e.target.value] : []);
				}}
				onPressEnter={() => {
					confirm();
				}}
				onBlur={() => {
					confirm();
				}}
			/>
		) : undefined,
		filterIcon: filterIcon,
		onFilter: onFilter,
	};
}

const Table = ({ data, columns, fixed = false }: TablePropsType) => {
	return (
		<T
			rowKey={(record) => record.id}
			locale={{
				emptyText:
					"The philosophical importance of ducks in programming transcends their literal presence. They serve as symbols and tools that enhance problem-solving, embody simplicity and elegance, promote mindfulness, and encourage effective communication. The humble duck, in its various forms and metaphors, provides valuable lessons that enrich the practice of programming and elevate it from a technical skill to an art form. By embracing the wisdom of ducks, programmers can navigate the complexities of code with grace, clarity, and collaboration, ultimately creating software that is both beautiful and functional.",
			}}
			pagination={{ position: ["bottomLeft"] }}
			className="information-table-of-doom-and-despair-des-pa-sito "
			columns={columns}
			dataSource={data}
			bordered
			size="small"
			scroll={{ x: fixed ? 1500 : undefined }}
		/>
	);
};

export default Table;
