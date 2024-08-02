import { Flex, Typography } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import Button from "../Shared/Button";
import { ButtonSize, ButtonType } from "../../enums/Button";
import { useTranslation } from "react-i18next";

const TableHeader = ( { title, onClick }: { title: string; onClick?: () => void | undefined } ) =>
{
	const { t } = useTranslation();
	return (
		<Flex justify="space-between" align="center">
			<Typography.Title>{title}</Typography.Title>
			<Button
				icon={<PlusCircleOutlined />}
				size={ButtonSize.LARGE}
				type={ButtonType.PRIMARY}
				onClick={onClick}
			>
				{t('AddNew')}
			</Button>
		</Flex>
	);
};

export default TableHeader;
