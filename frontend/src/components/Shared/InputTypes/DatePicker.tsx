import { DatePicker as DudePerfect, Form } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { GetProps } from "antd";

type DatePickerProps = {
	label: string;
	name: string;
	required?: boolean;
	isDisabledDate?: boolean;
	dependsOn?: string;
};
type RangePickerProps = GetProps<typeof DudePerfect.RangePicker>;

dayjs.extend(customParseFormat);
const disabledDate: RangePickerProps["disabledDate"] = (current) => {
	return current && current < dayjs().startOf("day");
};

const DatePicker = ({ label, name, required, isDisabledDate, dependsOn }: DatePickerProps) => {
	function dateValidator(getFieldValue: any, dependsOn?: string) {
		console.log("getFieldValue", getFieldValue);
		return {
			validator(rule: any, value: any) {
				const startTime = getFieldValue(dependsOn);
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

	const rulesList: any = [
		{
			required: required,
			message: `Please enter ${label}!`,
		},
	];

	if (dependsOn) {
		rulesList.push(({ getFieldValue }: any) => dateValidator(getFieldValue, dependsOn));
	}

	return (
		<Form.Item
			name={name}
			label={label}
			rules={rulesList}
			validateDebounce={1000}
			dependencies={[dependsOn]}
		>
			<DudePerfect
				size="large"
				format={"DD/MM/YYYY"}
				style={{ width: "100%" }}
				disabledDate={isDisabledDate ? disabledDate : undefined}
			/>
		</Form.Item>
	);
};
export default DatePicker;
