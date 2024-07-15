import { Flex } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import Button from "../Shared/Button";
import { ButtonSize } from "../../enums/Button";

const TableHeader = ({ title }: { title: string }) => {
	return (
		<Flex align="center" justify="space-between">
			<h1>{title}</h1>
			<Button icon={<PlusCircleOutlined />} size={ButtonSize.LARGE}>
				Add New
			</Button>
		</Flex>
	);
};

export default TableHeader;
