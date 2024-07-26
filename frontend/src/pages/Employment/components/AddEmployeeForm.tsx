import Steps from "../../../components/Shared/Steps";
import DrowerButton from "./DrowerButton";
import getStepItems from "./StepItem";
import dayjs from "dayjs";
import { Form, Layout } from "antd";
import useHttp from "../../../hooks/useHttp";
import { useState } from "react";
import exporter from "../utils/helperFunctions";
import { AddEmployeeFormProps } from "../types/EmployeeFormTypes";
import { EmployeeDataType } from "../types/Employee";
import "../styles/steps.css";

const { Content, Sider } = Layout;
const devRoles = exporter.getDevRoles();

const AddEmployeeForm = ({ selectedEmployee, onAdd, onEdit }: AddEmployeeFormProps) => {
	const [current, setCurrent] = useState(0);
	const [form] = Form.useForm<EmployeeDataType>();
	const [isLoading, error, sendRequest] = useHttp();
	const initialValues = exporter.getInitialFormValues(selectedEmployee);
	const [valuesToSubmit, setValuesToSubmit] = useState(initialValues);

	function handleStepChanges(changer: number) {
		if (changer > 0) {
			form.validateFields().then(() => {
				setCurrent((prev) => prev + changer);
				console.log(form.isFieldsValidating(), "validating");
			});
		} else {
			setCurrent((prev) => prev + changer);
		}
	}

	function handleFinish() {
		form.validateFields().then(() => {
			setCurrent((prev) => prev + 1);
			console.log(form.isFieldsValidating(), "validating");
  
			const data = {
				...valuesToSubmit,
				username: valuesToSubmit.name + valuesToSubmit.surname,
				password: "codevider",
				phoneNumber: parseInt(valuesToSubmit.phoneNumber.toString()),
				salary: parseInt(valuesToSubmit.salary.toString()),
				// status: "Working",
				startingDate: dayjs(valuesToSubmit.startingDate).format("D/M/YYYY"),
				contract: "Permanent",
				isDeleted: false,
			};

			const userRole = devRoles.includes(data.position)
				? "dev"
				: valuesToSubmit.position.toLowerCase();

			console.log(data);

			if (selectedEmployee) {
				console.log(selectedEmployee._id, "selected employee");
				sendRequest(
					exporter.submitHelper(`employees/${selectedEmployee._id}`, data, "PATCH"),
					(responseData: any) => {
						onEdit(responseData);
					},
				);
			} else {
				sendRequest(exporter.submitHelper("employees", data), (responseData: any) => {
					onAdd(responseData);
				});
				sendRequest(
					exporter.submitHelper("users", {
						username: data.username,
						password: data.password,
						role: userRole,
					}),
					(responseData: any) => {
						console.log(responseData, "response data");
					},
				);
			}
		});
	}

	function handleInputChange(value: any, identifier: string) {
		form.setFieldsValue({ [identifier]: value });
		setValuesToSubmit((prev) => ({ ...prev, [identifier]: value }));
	}

	const item = getStepItems(current, handleInputChange, form, isLoading, error);

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
