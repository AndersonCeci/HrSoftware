import type { TableProps } from "antd";
import { createTableColumns } from "../components/Table/Table";

export type TablePropsType = {
	data: any[];
	columns: TableProps<any>["columns"];
	fixed?: boolean;
};

export type createTableColumns = {
	title: string;
	dataIndex: string;
	key: string;
	fixed?: "left" | "right" | undefined; 
	displayAs?: (text: any) => JSX.Element;
	width?: number | string;
	align?: "left" | "right" | "center";
	filters?: { text: string; value: string }[];
	filterSearch?: boolean | ((inputValue: string, filter: any) => boolean);
	filterIcon?: JSX.Element ;
	filterDropdown?: boolean;
	onFilter?: (value: any, record: any) => boolean;
}