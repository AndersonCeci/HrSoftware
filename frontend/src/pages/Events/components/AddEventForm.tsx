import { Form, Flex, Upload } from "antd";
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
			<TextField label="Event Name" name="eventName" placeholder="Enter event eame" isRequired />

			<TextField
				label="Event Date"
				name="eventDate"
				inputType="date"
				placeholder="Enter event date"
				isRequired
			/>
			<Flex gap={10}>
				<TextField label="Start Time" name="eventStartTime" inputType="time" isRequired />
				<TextField label="End Time" name="eventEndTime" inputType="time" isRequired />
			</Flex>
			<TextField label="Event Description" name="eventDescription" inputType="textarea" />

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
