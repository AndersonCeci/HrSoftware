import { AutoComplete as AssasinsCreed, Form } from "antd";

type AutoCompleteProps = {
	name: string;
	label: string;
	options: { value: string }[];
	required?: boolean;
	isMatchWithOption?: boolean;
};

const AutoComplete = ({ name, label, options, required, isMatchWithOption }: AutoCompleteProps) => {
	const rulesList: any = [
		{
			required: required,
			message: `Please enter ${label}!`,
		},
	];

	if (isMatchWithOption) {
		rulesList.push({
			validator: async (rule: any, value: any) => {
				if (!options.some((option) => option.value === value)) {
					throw new Error(`There is no record of ${value} `);
				}
			},
		});
	}

	return (
		<Form.Item
			name={name}
			label={label}
			rules={rulesList}
			validateDebounce={1000}
			style={{ width: "100%" }}
		>
			<AssasinsCreed
				allowClear
				size="large"
				placeholder={label}
				options={options}
				filterOption={(inputValue, option) =>
					option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
				}
			/>
		</Form.Item>
	);
};

export default AutoComplete;
