import { Flex, Typography } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import Button from "../Shared/Button";
import { ButtonSize, ButtonType } from "../../enums/Button";

const TableHeader = ({
	title,
	onClick,
	hideButton,
}: {
	title: string;
	onClick?: () => void | undefined;
	hideButton?: boolean;
}) => {
	return (
		<Flex justify="space-between" align="center">
			<Typography.Title>{title}</Typography.Title>
			{!hideButton && (
				<Button
					icon={<PlusCircleOutlined />}
					size={ButtonSize.LARGE}
					type={ButtonType.PRIMARY}
					onClick={onClick}
				>
					Add {title}
				</Button>
			)}
		</Flex>
	);
};

export default TableHeader;
