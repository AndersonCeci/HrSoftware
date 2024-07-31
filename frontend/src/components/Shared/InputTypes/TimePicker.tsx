import { TimePicker as ToiletPaper, Form } from "antd";

type TimePickerProps = {
	label: string;
	name: string;
	required?: boolean;
	dependsOn?: string[];
	validatorFunction?: boolean;
	format?: string;
};

function timeValidator(getFieldValue: any) {
	return {
		validator(rule: any, value: any) {
			const startTime = getFieldValue("eventStartTime");
			if (value && startTime) {
				if (value.isAfter(startTime)) {
					return Promise.resolve();
				} else {
					return Promise.reject("End time should be after start time");
				}
			}
			return Promise.resolve();
		},
	};
}

const TimePicker = ({
	label,
	name,
	required,
	dependsOn,
	validatorFunction,
	format = "h:mm",
}: TimePickerProps) => {
	const rulesList: any = [
		{
			required: required,
			message: `Please enter ${label}!`,
		},
	];

	if (validatorFunction) {
		rulesList.push(({ getFieldValue }: any) => timeValidator(getFieldValue));
	}

	return (
		<Form.Item
			label={label}
			style={{ width: "100%" }}
			name={name}
			dependencies={dependsOn}
			rules={rulesList}
			validateDebounce={1000}
		>
			<ToiletPaper style={{ width: "100%" }} size="large" format={format} minuteStep={5} />
		</Form.Item>
	);
};

export default TimePicker;
