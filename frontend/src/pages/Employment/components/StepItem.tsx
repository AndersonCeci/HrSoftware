import { UserOutlined } from "@ant-design/icons";
import { FaUserCheck } from "react-icons/fa";
import { IoDocumentOutline } from "react-icons/io5";
import { CiCircleCheck } from "react-icons/ci";
import { FaCircleCheck } from "react-icons/fa6";
import { BsPencilSquare } from "react-icons/bs";
import { BiSolidError } from "react-icons/bi";
import FirstPanel from "./FirstPanel";
import SecondStep from "./SecondStep";
import FinalStep from "./FinalStep";

type StepItem = {
	subTitle: string;
	content: JSX.Element;
	icon: JSX.Element;
};

type StepItemProps = (
	current: number,
	setCurrent: (value: number) => void,
	form: any,
	isLoading: boolean,
	error: string | null,
) => StepItem[];

const getStepItems: StepItemProps = (current, setCurrent, form, isLoading, error) => {
	function resetOnError() {
		setCurrent(0);
	}

	return [
		{
			subTitle: "Create Account",
			content: <FirstPanel />,
			icon: current === 0 ? <UserOutlined /> : <FaUserCheck />,
		},
		{
			subTitle: "Add Information",
			content: <SecondStep form={form} />,
			icon: current === 1 ? <BsPencilSquare /> : <IoDocumentOutline />,
		},
		{
			subTitle: "Finalize Account",
			content: <FinalStep isSubmitting={isLoading} errorMsg={error} onGoBackBtn={resetOnError} />,
			icon: current === 2 ? error ? <BiSolidError /> : <FaCircleCheck /> : <CiCircleCheck />,
		},
	];
};

export default getStepItems;
