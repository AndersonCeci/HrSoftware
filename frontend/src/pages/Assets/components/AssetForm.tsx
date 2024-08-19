import { useRef, useImperativeHandle, forwardRef, useEffect, useState } from "react";
import { Form } from "antd";
import FormInputs from "../../../components/Shared/InputTypes/FormInputs";
import dayjs from "dayjs";
import useHttp from "../../../hooks/useHttp";
import { AssetFormProps } from "../types/AddAssetsForm";
import { EmployeeDataType } from "../../Employment/types/Employee";

const API = import.meta.env.REACT_APP_ASSET_API;
const EMPLOYEE = import.meta.env.REACT_APP_EMPLOYEE_API;

const AssetForm = forwardRef(({ onAdd }: AssetFormProps, ref) => {
	const formRef = useRef<any>();
	const [form] = Form.useForm();
	const [employeeList, setEmployeeList] = useState<EmployeeDataType[]>([]);
	const [, , sendRequest] = useHttp();

	console.log(employeeList);

	useEffect(() => {
		sendRequest({ url: `${EMPLOYEE}/search` }, (responseData: EmployeeDataType[]) =>
			setEmployeeList(responseData),
		);
	}, []);

	useImperativeHandle(ref, () => ({
		submit: () => {
			formRef.current.submit();
		},
	}));

	function onFinish(values: any) {
		console.log(employeeList, "employeeList");
		const selectedEmployee = employeeList.find(
			(employee: EmployeeDataType) => employee.name + " " + employee.surname === values.userName,
		)?._id;

		const dataToSubmit = {
			employeeDetails: selectedEmployee,
			assignDate: dayjs(values.dateGiven).format("YYYY-MM-DD"),
		};
		onAdd(dataToSubmit);
	}

	return (
		<Form form={form} ref={formRef} layout="vertical" autoComplete="off" onFinish={onFinish}>
			<FormInputs.DatePicker label="Date Given" name="assignDate" required isDisabledDate />
			<FormInputs.AutoComplete
				label="Employee"
				name="userName"
				required
				options={employeeList.map((employee: EmployeeDataType) => ({
					value: employee.name + " " + employee.surname,
					label: employee.name + " " + employee.surname,
				}))}
				isMatchWithOption
			/>
		</Form>
	);
});

export default AssetForm;
