import { Flex, Typography } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import Button from "../Shared/Button";
import { ButtonSize, ButtonType } from "../../enums/Button";

const TableHeader = ({ title, onClick }: { title: string; onClick?: () => void | undefined }) => {
	return (
		<Flex justify="space-between" align="center">
			<Typography.Title>{title}</Typography.Title>
			<Button
				icon={<PlusCircleOutlined />}
				size={ButtonSize.LARGE}
				type={ButtonType.PRIMARY}
				onClick={onClick}
			>
				Add {title}
			</Button>
		</Flex>
	);
};

export default TableHeader;
