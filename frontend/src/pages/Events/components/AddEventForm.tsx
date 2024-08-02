import { Form, Flex, Upload } from "antd";
import FormInputs from "../../../components/Shared/InputTypes/FormInputs";
import TextField from "../../../components/Shared/TextField";
import Button from "../../../components/Shared/Button";
import { ButtonSize, ButtonType } from "../../../enums/Button";
import { UploadOutlined } from "@ant-design/icons";
import { useRef, forwardRef, useImperativeHandle } from "react";

type AddEventFormProps = {
	onAdd: (event: any) => void;
};

const AddEventForm = forwardRef(({ onAdd }: AddEventFormProps, ref) => {
	const [form] = Form.useForm();
	const formRef = useRef<any>();

	useImperativeHandle(ref, () => ({
		submit: () => {
			formRef.current.submit();
		},
	}));

	function onFinish(values: any) {
		console.log("Finish");
		// console.log(values);
		const date = new Date(values.eventDate);
		const valuesToSubmit = {
			...values,
			eventDate: values.eventDate.format("YYYY-MM-DD"),
			eventStartTime: values.eventStartTime.format("HH:mm"),
			eventEndTime: values.eventEndTime.format("HH:mm"),
			eventDiscription: values.eventDescription ? values.eventDescription : " ",
			location: "Location",
		};

		onAdd(valuesToSubmit);
	}

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

	return (
		<Form
			onFinish={onFinish}
			layout="vertical"
			style={{ maxWidth: 600, margin: "40px auto" }}
			form={form}
			name="basic"
			ref={formRef}
			autoComplete="off"
		>
			<FormInputs.Input label="Event Name" name="eventName" required />

			<FormInputs.DatePicker label="Event Start" name="eventDate" required isDisabledDate />
			<Flex gap={10}>
				<FormInputs.TimePicker label="Start Time" name="eventStartTime" required />
				<FormInputs.TimePicker
					label="End Time"
					name="eventEndTime"
					required
					dependsOn={["eventStartTime"]}
					validatorFunction
				/>
			</Flex>
			<FormInputs.Input label="Event Description" name="eventDescription" type="textarea" />

			<Form.Item label="Event Attachment" name="image">
				<Flex className="event-attachment-container">
					<Upload
						beforeUpload={() => {
							return false;
						}}
						listType="picture-card"
						multiple
					>
						<Button
							icon={<UploadOutlined />}
							type={ButtonType.TEXT}
							size={ButtonSize.LARGE}
						></Button>
					</Upload>
				</Flex>
			</Form.Item>
		</Form>
	);
});

export default AddEventForm;
