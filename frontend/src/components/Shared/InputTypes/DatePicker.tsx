import { DatePicker as DudePerfect, Form } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { GetProps } from "antd";

type DatePickerProps = {
	label: string;
	name: string;
	required?: boolean;
	isDisabledDate?: boolean;
};
type RangePickerProps = GetProps<typeof DudePerfect.RangePicker>;

dayjs.extend(customParseFormat);
const disabledDate: RangePickerProps["disabledDate"] = (current) => {
	return current && current < dayjs().startOf("day");
};

const DatePicker = ({ label, name, required, isDisabledDate }: DatePickerProps) => {
	return (
		<Form.Item
			name={name}
			label={label}
			rules={[
				{
					required: required,
					message: `Please enter ${label}!`,
				},
			]}
            validateDebounce={1000}
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
