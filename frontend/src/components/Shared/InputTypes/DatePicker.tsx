import { DatePicker as DudePerfect, Form } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { GetProps } from "antd";
import { t } from "i18next";

type DatePickerProps = {
	label: string;
	name: string;
	required?: boolean;
	isDisabledDate?: boolean | number;
	disableFuture?: boolean;
	dependsOn?: string;
};
type RangePickerProps = GetProps<typeof DudePerfect.RangePicker>;

dayjs.extend(customParseFormat);

const DatePicker = ({
	label,
	name,
	required,
	isDisabledDate,
	disableFuture,
	dependsOn,
}: DatePickerProps) => {
	function dateValidator(getFieldValue: any, dependsOn?: string) {
		return {
			validator(_: any, value: any) {
				const startTime = getFieldValue(dependsOn);
				if (value && startTime) {
					if (value.isAfter(startTime)) {
						return Promise.resolve();
					} else {
						return Promise.reject(t("errorMsgInvalidDate"));
					}
				}
				return Promise.resolve();
			},
		};
	}

	const disabledDate: RangePickerProps["disabledDate"] = (current) => {
		return disableFuture
			? current && current > dayjs().startOf("day")
			: current && current < dayjs().startOf("day");
	};

	const rulesList: any = [
		{
			required: required,
			message: `${t("errorMessages")} ${label}!`,
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
			style={{ width: "100%" }}
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
