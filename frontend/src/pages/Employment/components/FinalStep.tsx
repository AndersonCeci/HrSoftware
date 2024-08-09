import { Result } from "antd";
import Loader from "../../../components/Shared/Loader";
import { ResultStatusType } from "antd/lib/result";
import Button from "../../../components/Shared/Button";

type FinalStepProps = {
	isSubmitting: boolean;
	error: string | null;
};

const FinalStep = ({ isSubmitting, error }: FinalStepProps) => {
	return !isSubmitting ? (
		<>
			<Result
				status={error ? "error" : "success"}
				title={error ? error : "Your form has been submitted"}
				extra={[]}
			/>
			{/* <Button></Button> */}
		</>
	) : (
		<Loader />
	);
};

export default FinalStep;
