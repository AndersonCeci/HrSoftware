import { EmployeeDetails } from "./EmployeeDetailsProps";

export interface Interview {
  date: Date;
  notes: string;
  evaluation: string;
  interviewers: EmployeeDetails[];
}
