import Steps from "../../../components/Shared/Steps";
import Button from "../../../components/Shared/Button";
import { UserOutlined } from "@ant-design/icons";
import { FaUserCheck } from "react-icons/fa";
import { IoDocumentOutline } from "react-icons/io5";
import { CiCircleCheck } from "react-icons/ci";
import { FaCircleCheck } from "react-icons/fa6";
import dayjs from "dayjs";
import { BsPencilSquare } from "react-icons/bs";
import FirstPanel from "./FirstPanel";
import SecondStep from "./SecondStep";
import FinalStep from "./FinalStep";
import { Space, Form, Layout, Row, Col } from "antd";
import { ButtonType } from "../../../enums/Button";
import { useState } from "react";
import { EmployeeDataType } from "../types/Employee";
import useHttp from "../../../hooks/useHttp";

const { Content, Sider } = Layout;

type AddEmployeeFormProps = {
	selectedEmployee?: EmployeeDataType | undefined;
	onAdd: (newEmployee: EmployeeDataType) => void;
	onEdit: (editedEmployee: EmployeeDataType) => void;
};

const AddEmployeeForm = ({ selectedEmployee, onAdd, onEdit }: AddEmployeeFormProps) => {
	const [current, setCurrent] = useState(0);
	const [form] = Form.useForm<EmployeeDataType>();
	const initialValues = selectedEmployee
		? prepareInitialValues(selectedEmployee)
		: {
				name: "",
				surname: "",
				email: "",
				phone: "",
				salary: "",
				teamLeader: "",
				position: "",
				startDate: "",
		  };

	const [valuesToSubmit, setValuesToSubmit] = useState(initialValues);
	const [isLoading, error, sendRequest] = useHttp();

	function prepareInitialValues(selectedEmployee: EmployeeDataType) {
		return {
			...selectedEmployee,
			startDate: dayjs(selectedEmployee["startDate"], "D/M/YYYY"),
		};
	}

	function handleStepChanges(changer: number) {
		if (changer > 0) {
			form.validateFields().then(() => {
				setCurrent((prev) => prev + changer);
			});
		} else {
			setCurrent((prev) => prev + changer);
		}
	}

	function handleFinish() {
		const data = {
			...valuesToSubmit,
			startDate: dayjs(valuesToSubmit["startDate"]).format("D/M/YYYY"),
		};

		if (selectedEmployee) {
			sendRequest(
				{
					url: `https://jsonplaceholder.typicode.com/posts/${selectedEmployee.id}`,
					headers: { "Content-Type": "application/json" },
					method: "PATCH",
					body: data,
				},
				(responseData: any) => {
					console.log(responseData);
					onEdit(responseData);
				},
			);
		} else {
			sendRequest(
				{
					url: "https://jsonplaceholder.typicode.com/posts",
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: data,
				},
				(responseData: any) => {
					console.log(responseData);
					onAdd(responseData);
				},
			);
		}
	}

	function handleInputChange(value: any, identifier: string) {
		form.setFieldsValue({ [identifier]: value });
		setValuesToSubmit((prev) => ({ ...prev, [identifier]: value }));
	}

	const item = [
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

	return (
		<Layout style={{ height: "100%", background: "#fff" }}>
			<Content>
				<Form
					layout="vertical"
					form={form}
					name="basic"
					initialValues={initialValues}
					onFinish={handleFinish}
				>
					<div>{item[current].content}</div>
					<Row>
						<Col offset={1}>
							{current !== 2 && (
								<Space>
									{current > 0 && <Button onClick={() => handleStepChanges(-1)}> Back</Button>}
									<Button type={ButtonType.PRIMARY} onClick={() => handleStepChanges(1)} block>
										{current === item.length - 2 ? "Finish" : "Next"}
									</Button>
								</Space>
							)}
						</Col>
					</Row>
				</Form>
			</Content>
			<Sider theme={"light"}>
				<Steps direction="vertical" current={current} responsive items={item} />
			</Sider>
		</Layout>
	);
};

export default AddEmployeeForm;
