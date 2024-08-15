import { EmployeeDataType } from "./Employee";

export type AddEmployeeFormProps = {
  selectedEmployee?: EmployeeDataType | undefined;
  onAdd: (newEmployee: EmployeeDataType) => void;
  onEdit: (editedEmployee: EmployeeDataType) => void;
};
