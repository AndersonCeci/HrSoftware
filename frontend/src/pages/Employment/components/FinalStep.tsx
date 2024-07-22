import { Result, Spin } from "antd";
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
				status={error ? "error" : ("success" as ResultStatusType)}
				title={error ? "There was an error submitting the form" : "Your form has been submitted"}
				extra={[]}
			/>
			<Button></Button>
		</>
	) : (
		<Spin />
	);
};

export default FinalStep;
