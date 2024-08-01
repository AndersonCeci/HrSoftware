import { Form } from "antd";
import FormInputs from "../../../components/Shared/InputTypes/FormInputs";
import Button from "../../../components/Shared/Button";

import { ButtonType } from "../../../enums/Button";
import { RequestedDataType } from "../types/RequestedLeave";
import { useEffect, useState } from "react";
import useHttp from "../../../hooks/useHttp";

const EMPLOYEE = import.meta.env.REACT_APP_EMPLOYEE_API;

const RequestForm = ({ onAdd }: any) => {
	const [form] = Form.useForm<RequestedDataType>();
	const [, , fetchData] = useHttp();
	const [employee, setEmployee] = useState<any[]>([]);

	useEffect(() => {
		fetchData({ url: `${EMPLOYEE}/usernames` }, (data) => {
			setEmployee(data);
		});
	}, []);

	const handleSubmit = () => {
		console.log(form.getFieldsValue());
		const values = {
			EmployeeName: form.getFieldValue("username"),
			StartTime: form.getFieldValue("leaveFrom"),
			EndTime: form.getFieldValue("leaveTo"),
			type: form.getFieldValue("leaveType"),
			Reason: form.getFieldValue("reason"),
		};

		onAdd(values);
	};

	const type = [
		{ label: "Annual Leave", value: "annual" },
		{ label: "Sick Leave", value: "sick" },
		{ label: "Other", value: "other" },
	];
	
	return (
		<Form form={form} name="basic" layout="vertical" onFinish={handleSubmit} autoComplete="off">
			<FormInputs.AutoComplete
				name="username"
				label="Username"
				required
				options={employee}
				isMatchWithOption
			/>
			<FormInputs.DatePicker name="leaveFrom" label="Leave From" required isDisabledDate />
			<FormInputs.DatePicker
				name="leaveTo"
				label="Leave To"
				required
				isDisabledDate
				dependsOn="leaveFrom"
			/>
			<FormInputs.Select name="leaveType" label="Leave Type" options={type} required />
			<FormInputs.Input name="reason" label="Reason" type="textarea" />
			<Button type={ButtonType.PRIMARY} htmlType="submit">
				Apply
			</Button>
		</Form>
	);
};
export default RequestForm;
