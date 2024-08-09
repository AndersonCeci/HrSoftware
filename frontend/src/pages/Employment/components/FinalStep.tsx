import { Result } from "antd";
import Loader from "../../../components/Shared/Loader";
import Button from "../../../components/Shared/Button";

type FinalStepProps = {
	isSubmitting: boolean;
	errorMsg: string | null;
	onGoBackBtn: () => void;
};

const FinalStep = ({ isSubmitting, errorMsg, onGoBackBtn }: FinalStepProps) => {
	return !isSubmitting ? (
		<>
			<Result
				status={errorMsg ? "error" : "success"}
				title={errorMsg ? errorMsg : "Your form has been submitted"}
				extra={[
					errorMsg && (
						<Button danger onClick={onGoBackBtn}>
							Go back
						</Button>
					),
				]}
			/>
		</>
	) : (
		<Loader />
	);
};

export default FinalStep;
