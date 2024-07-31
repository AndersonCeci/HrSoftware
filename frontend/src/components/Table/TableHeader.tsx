import { Flex } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import Button from "../Shared/Button";
import { ButtonSize } from "../../enums/Button";
import { t } from "i18next";

const TableHeader = ( { title, onClick }: { title: string, onClick?: () => void | undefined } ) =>
{
	
	return (
		<Flex align="center" justify="space-between">
			<h1>{title}</h1>
			<Button icon={<PlusCircleOutlined />} size={ButtonSize.LARGE} onClick={onClick}>
				{t('AddNew')}
			</Button>
		</Flex>
	);
};

export default TableHeader;
