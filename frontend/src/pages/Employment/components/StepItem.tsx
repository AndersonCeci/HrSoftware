import { UserOutlined } from "@ant-design/icons";
import { FaUserCheck } from "react-icons/fa";
import { IoDocumentOutline } from "react-icons/io5";
import { CiCircleCheck } from "react-icons/ci";
import { FaCircleCheck } from "react-icons/fa6";
import { BsPencilSquare } from "react-icons/bs";
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
	handleInputChange: (value: string, key: string) => void,
	form: any,
	isLoading: boolean,
	error: string | null,
) => StepItem[];

const getStepItems: StepItemProps = (current, handleInputChange, form, isLoading, error) => {
	return [
		{
			subTitle: "Create Account",
			content: <FirstPanel onChange={handleInputChange} form={form} />,
			icon: current === 0 ? <UserOutlined /> : <FaUserCheck />,
		},
		{
			subTitle: "Add Information",
			content: <SecondStep onChange={handleInputChange} form={form} />,
			icon: current === 1 ? <BsPencilSquare /> : <IoDocumentOutline />,
		},
		{
			subTitle: "Finalize Account",
			content: <FinalStep isSubmitting={isLoading} error={error} />,
			icon: current === 2 ? <FaCircleCheck /> : <CiCircleCheck />,
		},
	];
};

export default getStepItems;
