import dayjs from "dayjs";
import { EmployeeDataType } from "../types/Employee";
import { initialValuesType } from "../types/InitialValuesType";

const exporter = {
  getInitialFormValues,
  validate,
  getDevRoles,
  getFormValues,
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
        status: "",
        profilePhoto: "",
        position: "",
        startingDate: "",
        nID: "",
        gender: "",
        contract: "",
      };

  return initialValues;
}

function prepareInitialValues(selectedEmployee: EmployeeDataType) {
  return {
    ...selectedEmployee,
    // birthDate: dayjs(selectedEmployee["birthDate"], "DD/MM/YYYY"),
    startingDate: dayjs(selectedEmployee["startingDate"], "DD/MM/YYYY"),
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
  ];
}

export function getFormValues(form: any) {
  return {
    name: form.getFieldValue("name"),
    surname: form.getFieldValue("surname"),
    email: form.getFieldValue("email").split("@")[0] + "@codevider.com",
    phoneNumber: form.getFieldValue("phoneNumber"),
    position: form.getFieldValue("position"),
    salary: form.getFieldValue("salary"),
    status: form.getFieldValue("status"),
    profilePhoto: form.getFieldValue("profilePhoto"),
    teamLeaders: form.getFieldValue("teamLeaders") || [],
    startingDate: form.getFieldValue("startingDate").format("DD/MM/YYYY"),
    contract: form.getFieldValue("contract"),
    nID: form.getFieldValue("nID"),
    birthDate: form.getFieldValue("birthDate").format("DD/MM/YYYY"),
    // username: "ESHTE STRING",
    // password: "codevider",
    gender: form.getFieldValue("gender"),
  };
}
