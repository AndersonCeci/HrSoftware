import { SelectProps } from "antd";
import { EmployeeDetails } from "../../types/EmployeeDetailsProps";

type CustomTagProps = SelectProps<EmployeeDetails>["tagRender"];

const tagRender: CustomTagProps = (props) => {
  return <div></div>;
};

export default tagRender;
