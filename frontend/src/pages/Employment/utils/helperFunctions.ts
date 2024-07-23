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

export function getInitialFormValues(data: EmployeeDataType | undefined): initialValuesType {
	const initialValues = data
		? prepareInitialValues(data)
		: {
				name: "",
				surname: "",
				email: "",
				phone: "",
				salary: NaN,
				teamLeader: "",
				position: "",
				startDate: dayjs(),
		  };

	return initialValues;
}

function prepareInitialValues(selectedEmployee: EmployeeDataType) {
	return {
		...selectedEmployee,
		startDate: dayjs(selectedEmployee["startDate"], "D/M/YYYY"),
	};
}

export function validate(salary: number | null | undefined) {
	return salary === undefined || salary === null || salary <= 0;
}

export function getDevRoles() {
	return ["Frontend Developer", "Backend Developer", "Fullstack Developer"];
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
