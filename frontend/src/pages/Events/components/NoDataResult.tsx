import { Result } from "antd";
import NoDataImg from "../../../assets/Empty-pana.svg";
import ErrorImg from "../../../assets/Computer troubleshooting-bro.svg";
import Button from "../../../components/Shared/Button";
import { ButtonSize, ButtonType } from "../../../enums/Button";
import "../styles/NoData.css";

type NoDataResultProps = {
  onOpenModal: () => void;
  isError?: boolean;
};

const NoDataResult = ({ onOpenModal, isError = false }: NoDataResultProps) => {
  const msg = isError
    ? "Something went wrong!"
    : "There are no events for this month untill now";

  return (
    <Result
      title={isError ? "Error" : "No Events"}
      subTitle={msg}
      icon={
        <img
          className="no-data-img"
          src={isError ? ErrorImg : NoDataImg}
          alt=""
        />
      }
      extra={
        <Button
          type={ButtonType.PRIMARY}
          size={ButtonSize.LARGE}
          onClick={onOpenModal}
        >
          Add Event
        </Button>
      }
    />
  );
};

export default NoDataResult;
