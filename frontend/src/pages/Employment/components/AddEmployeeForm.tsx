import Steps from "../../../components/Shared/Steps";
import DrowerButton from "./DrowerButton";
import getStepItems from "./StepItem";
import { Form, Layout } from "antd";
import useHttp from "../../../hooks/useHttp";
import { useState } from "react";
import exporter from "../utils/helperFunctions";
import { AddEmployeeFormProps } from "../types/EmployeeFormTypes";
import { EmployeeDataType } from "../types/Employee";
import "../styles/steps.css";

const API = import.meta.env.REACT_APP_EMPLOYEE_API;

const { Content, Sider } = Layout;
const devRoles = exporter.getDevRoles();

const AddEmployeeForm = ({ selectedEmployee, onAdd, onEdit }: AddEmployeeFormProps) => {
	const [current, setCurrent] = useState(0);
	const [form] = Form.useForm<EmployeeDataType>();
	const [isLoading, error, sendRequest] = useHttp();
	const initialValues = exporter.getInitialFormValues(selectedEmployee);

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
		form.validateFields().then(() => {
			const data = exporter.getFormValues(form);

			setCurrent((prev) => prev + 1);
			form.submit();
			sendRequest(
				{
					url: selectedEmployee ? `${API}/${selectedEmployee._id}` : API,
					method: selectedEmployee ? "PATCH" : "POST",
					headers: { "Content-Type": "application/json" },
					body: data,
				},
				(responseData: any) => {
					selectedEmployee ? onEdit(responseData) : onAdd(responseData);
				},
			);

			if (!selectedEmployee) {
				const userRole = devRoles.includes(data.position) ? "dev" : data.position.toLowerCase();

				sendRequest(
					{
						url: `${import.meta.env.REACT_APP_USER_API}`,
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: {
							username: data.username,
							password: data.password,
							role: userRole,
						},
					},
					(responseData: any) => {
						console.log(responseData, "response data");
					},
				);
			}
		});
	}

	const item = getStepItems(current, form, isLoading, error);

	return (
		<Layout style={{ height: "100%", background: "#fff" }}>
			<Content>
				<Form
					layout="vertical"
					form={form}
					name="basic"
					initialValues={initialValues}
					autoComplete="off"
				>
					<div>{item[current].content}</div>
					<DrowerButton
						current={current}
						item={item}
						onChange={handleStepChanges}
						onFinish={handleFinish}
					/>
				</Form>
			</Content>
			<Sider className="steps-container" theme={"light"}>
				<Steps
					status={error ? "error" : "finish"}
					direction="vertical"
					responsive
					current={current}
					items={item}
				/>
			</Sider>
		</Layout>
	);
};

export default AddEmployeeForm;
