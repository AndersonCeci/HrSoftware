import dayjs from "dayjs";
import { EmployeeDataType } from "../types/Employee";
import { initialValuesType } from "../types/InitialValuesType";

const exporter = {
	getInitialFormValues,
	validate,
	getDevRoles,
	submitHelper,
};

export default exporter;

export function getInitialFormValues(data: EmployeeDataType | undefined) {
	const initialValues = data
		? prepareInitialValues(data)
		: {
				name: "",
				surname: "",
				email: "",
				phoneNumber: "",
				salary: "",
				teamLeader: "",
				position: "",
				startingDate: "",
				nID: "",
		  };

	return initialValues;
}

function prepareInitialValues(selectedEmployee: EmployeeDataType) {
	return {
		...selectedEmployee,
		startingDate: dayjs(selectedEmployee["startingDate"], "D/M/YYYY"),
	};
}

export function validate(salary: number | null | undefined) {
	return salary === undefined || salary === null || salary <= 0;
}

export function getDevRoles() {
	return [
		"Junior FrontEnd",
		"Junior BackEnd",
		"Senior FrontEnd",
		"Senior BackEnd",
		"FullStack",
		"DevOps",
		"ProjectManager",
	];
}

export function submitHelper(identifier: string, body: any, method: string = "POST") {
	return {
		url: `http://localhost:3000/${identifier}`,
		method: method,
		headers: {
			"Content-Type": "application/json",
		},
		body,
	};
}
