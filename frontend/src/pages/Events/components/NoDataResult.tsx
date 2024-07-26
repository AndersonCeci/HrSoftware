import { Result } from "antd";
import NoDataImg from "../../../assets/Empty-pana.svg";
import Button from "../../../components/Shared/Button";
import { ButtonSize, ButtonType } from "../../../enums/Button";
import "../styles/NoData.css";

type NoDataResultProps = {
	onOpenModal: () => void;
};

const NoDataResult = ({ onOpenModal }: NoDataResultProps) => {
	return (
		<Result
			title={"No Events"}
			subTitle={"There are no events for this month untill now"}
			icon={<img className="no-data-img" src={NoDataImg} alt="" />}
			extra={
				<Button type={ButtonType.PRIMARY} size={ButtonSize.LARGE} onClick={onOpenModal}>
					Add Event
				</Button>
			}
		/>
	);
};

export default NoDataResult;
