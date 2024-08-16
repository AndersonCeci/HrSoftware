import { EmployeeDataType } from "./Employee";

export type AddEmployeeFormProps = {
  selectedEmployee?: EmployeeDataType | undefined;
  onEdit: (editedEmployee: EmployeeDataType) => void;
};
