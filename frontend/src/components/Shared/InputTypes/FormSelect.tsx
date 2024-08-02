import Select from "../Select";
import { Form } from "antd";

type FormSelectProps = {
	name: string;
	label: string;
	options: {
		value: string;
		label: string;
	}[];
	required?: boolean;
};

const FormSelect = ({ name, label, options, required }: FormSelectProps) => {
	return (
		<Form.Item
			name={name}
			label={label}
			rules={[
				{
					required: required,
					message: `Please select ${label}!`,
				},
			]}
			style={{ width: "100%" }}
		>
			<Select  options={options} placeholder={`Select ${label}`} />
		</Form.Item>
	);
}; 

export default FormSelect;
