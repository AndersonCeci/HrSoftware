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
		console.log("Fetching employee list");
		fetchData({ url: `${EMPLOYEE}/usernames` }, (responseData: any) => setEmployee(responseData));
	}, []);
	console.log(employee);

	const handleSubmit = (value: any) => {
		const selected = employee.find((e) => e.username === value.username);

		const values = {
			employeeId: selected.id,
			StartTime: value.StartTime.format("YYYY-MM-DD"),
			EndTime: value.EndTime ? value.EndTime.format("YYYY-MM-DD") : null,
			leaveType: value.leaveType,
			description: value.reason,
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
				options={employee.map((e) => ({ label: e.username, value: e.username }))}
				isMatchWithOption
			/>
			<FormInputs.DatePicker name="StartTime" label="Leave From" required isDisabledDate />
			<FormInputs.DatePicker name="EndTime" label="Leave To" isDisabledDate dependsOn="StartTime" />
			<FormInputs.Select name="leaveType" label="Leave Type" options={type} required />
			<FormInputs.Input name="reason" label="Reason" type="textarea" />
			<Button type={ButtonType.PRIMARY} htmlType="submit">
				Apply
			</Button>
		</Form>
	);
};
export default RequestForm;
