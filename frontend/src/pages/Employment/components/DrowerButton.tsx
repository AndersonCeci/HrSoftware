import { Row, Col, Space } from "antd";
import Button from "../../../components/Shared/Button";
import { ButtonType } from "../../../enums/Button";

type DrowerButtonProps = {
	current: number;
	item: any[];
	onChange: (value: number) => void;
	onFinish: () => void;
};

const DrowerButton = ({ current, item, onChange, onFinish }: DrowerButtonProps) => {
	return (
		<Row>
			<Col offset={1}>
				{current !== 2 && (
					<Space>
						{current > 0 && <Button onClick={() => onChange(-1)}> Back</Button>}
						<Button
							type={ButtonType.PRIMARY}
							onClick={current === item.length - 2 ? onFinish : () => onChange(1)}
						>
							{current === item.length - 2 ? "Finish" : "Next"}
						</Button>
					</Space>
				)}
			</Col>
		</Row>
	);
};

export default DrowerButton;
