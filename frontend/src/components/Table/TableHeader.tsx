import { Flex, Typography } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import Button from "../Shared/Button";
import { ButtonSize, ButtonType } from "../../enums/Button";
import { useTranslation } from "react-i18next";

const TableHeader = ({
	title,
	onClick,
	items = [],
	hideButton,
}: {
	title: string;
	onClick?: () => void | undefined;
	items?: any[];
	hideButton?: boolean;
}) => {
	const { t } = useTranslation();
	return (
		<Flex
			justify="space-between"
			align="center"
			style={{
				marginTop: "1rem",
				marginBottom: "2rem",
			}}
		>
			<Typography.Title
				style={{
					margin: 0,
				}}
				level={2}
			>
				{title}
			</Typography.Title>
			{!hideButton && (
				<Button
					icon={<PlusCircleOutlined />}
					size={ButtonSize.LARGE}
					type={ButtonType.PRIMARY}
					onClick={onClick}
				>
					{t("AddNew")}
				</Button>
			)}
		</Flex>
	);
};

export default TableHeader;
