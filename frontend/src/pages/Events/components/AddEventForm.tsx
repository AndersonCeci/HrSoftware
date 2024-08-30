import { Form, Flex, Upload, Radio } from "antd";
import FormInputs from "../../../components/Shared/InputTypes/FormInputs";
import MapInput from "./Map/MapInput";
import Button from "../../../components/Shared/Button";
import { UploadOutlined } from "@ant-design/icons";
import { useRef, forwardRef, useImperativeHandle, useState } from "react";
import { RcFile } from "antd/lib/upload/interface";
import useMap from "../hook/useMap";
import { t } from "i18next";

type AddEventFormProps = {
	onAdd: (event: any) => void;
};

const AddEventForm = forwardRef(({ onAdd }: AddEventFormProps, ref) => {
	const [form] = Form.useForm();
	const formRef = useRef<any>();
	const [isMultipleDays, setIsMultipleDays] = useState(false);
	const [isUploadingFiles, setIsUploadingFiles] = useState(false);

	const map = useMap();

	useImperativeHandle(ref, () => ({
		submit: () => {
			formRef.current.submit();
		},
	}));

	function onFinish(values: any) {
		const valuesToSubmit = {
			...values,
			eventDate: values.eventDate.format("YYYY-MM-DD"),
			eventEndDate: values.eventEndDate
				? values.eventEndDate.format("YYYY-MM-DD")
				: values.eventDate.format("YYYY-MM-DD"),
			eventStartTime: values.eventStartTime.format("HH:mm"),
			eventEndTime: values.eventEndTime ? values.eventEndTime.format("HH:mm") : undefined,
			location: map.locationData,
		};

		onAdd(valuesToSubmit);
	}

	const handleUpload = async (files: (RcFile | undefined)[]) => {
		const formData = new FormData();
		files.forEach((file) => {
			formData.append("files", file as File);
		});

		try {
			setIsUploadingFiles(true);
			const uploadResponse = await fetch("http://localhost:3000/files/upload", {
				method: "POST",
				body: formData,
			});
			const uploadData = await uploadResponse.json();
			const fileUrls = uploadData.fileUrls;

			form.setFieldsValue({ images: fileUrls });
			setIsUploadingFiles(false);
		} catch (error) {
			console.error("File upload error:", error);
		}
	};

	const handleFileChange = (info: any) => {
		const files = info.fileList.map((file: any) => file.originFileObj as RcFile);
		if (files.length > 0) {
			handleUpload(files);
		}
	};

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
			<FormInputs.Input label={t("eventName")} name="eventName" required />

			<Flex
				align="center"
				justify="center"
				style={{
					marginTop: 10,
					marginBottom: 20,
					paddingBottom: 25,
					borderBottom: "1px solid #e0e0e0",
				}}
			>
				<Radio.Group
					onChange={(e) => {
						setIsMultipleDays(e.target.value === "multipleDays");
					}}
					buttonStyle="outline"
					optionType="button"
					defaultValue={"singleDay"}
				>
					<Radio value="singleDay">{t("singleDay")}</Radio>
					<Radio value="multipleDays">{t("multipleDays")}</Radio>
				</Radio.Group>
			</Flex>

			<Flex gap={10}>
				<FormInputs.DatePicker label={t("eventDate")} name="eventDate" required isDisabledDate />
				{isMultipleDays && (
					<FormInputs.DatePicker
						label={t("eventEndDate")}
						name="eventEndDate"
						isDisabledDate
						dependsOn="eventDate"
						required={isMultipleDays}
					/>
				)}
			</Flex>

			<Flex gap={10}>
				<FormInputs.TimePicker label={t("eventStartTime")} name="eventStartTime" required />
				{!isMultipleDays && (
					<FormInputs.TimePicker
						label={t("eventEndTime")}
						name="eventEndTime"
						dependsOn={"eventStartTime"}
						required={!isMultipleDays}
					/>
				)}
			</Flex>

			<MapInput map={map} />

			<FormInputs.Input label={t("eventDescription")} name="eventDescription" type="textarea" />

			<Form.Item
				label="Event Attachment"
				name="images"
				rules={[
					{
						required: true,
						message: "Please upload event images",
					},
				]}
			>
				<Flex className="event-attachment-container">
					<Upload
						beforeUpload={() => {
							return false;
						}}
						listType="picture-card"
						multiple
						maxCount={8}
						onChange={(info) => {
							const files: (RcFile | undefined)[] = info.fileList.map((file) => file.originFileObj);
							if (files) {
								handleUpload(files);
							}
						}}
					>
						<Button icon={<UploadOutlined />} type="dashed" size="large" shape="circle"></Button>
					</Upload>
				</Flex>
			</Form.Item>
		</Form>
	);
});

export default AddEventForm;
