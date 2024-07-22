import Select from "../../../components/Shared/Select";
import { Form, DatePicker, AutoComplete } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useRef, useImperativeHandle, forwardRef } from "react";
import type { AddAssetFormProps, RangePickerProps } from "../types/AddAssetsForm";
import { HTTP } from "../Enum/http";

dayjs.extend(customParseFormat);
const disabledDate: RangePickerProps["disabledDate"] = (current) => {
	return current && current < dayjs().startOf("day");
};

const AddAssetForm = forwardRef(
	({ availableOptions = [], availableEmployees, onSuccess }: AddAssetFormProps, ref) => {
		const formRef = useRef<any>();
		const availableAssets = [
			{
				value: "Laptop",
				label: "Laptop",
			},
			{
				value: "Monitor",
				label: "Monitor",
			},
			{
				value: "Keyboard",
				label: "Keyboard",
			},
			{
				value: "Mouse",
				label: "Mouse",
			},
			{
				value: "Headphones",
				label: "Headphones",
			},
			{
				value: "Phone",
				label: "Phone",
			},
			{
				value: "Tablet",
				label: "Tablet",
			},
			{
				value: "Other",
				label: "Other",
			},
		];

		useImperativeHandle(ref, () => ({
			submit: () => {
				formRef.current.submit();
			},
		}));

		const [form] = Form.useForm();

		function onChanges(value: any, identifier: string) {
			form.setFieldsValue({ [identifier]: value });
		}

		function handleSubmit(values: any) {
			console.log(values);
			const { assetType, dateGiven, userName } = values;

			const newAsset = {
				assetType: assetType,
				dateGiven: `${dateGiven.$D}/${dateGiven.$M + 1}/${dateGiven.$y}`,
				userName: userName,
			};

			console.log(newAsset);
			// console.log( typeof newAsset.date)

			async function handleAssetAdd(newAsset: any) {
				try {
					const response = await fetch(HTTP.ADDASSET, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(newAsset),
					});

					if (!response.ok) {
						throw new Error("Failed to add asset");
					}

					const data = await response.json();

					onSuccess(data);
				} catch (error) {
					console.error(error);
				}
			}

			handleAssetAdd(newAsset);
		}

		return (
			<Form
				form={form}
				ref={formRef}
				name="basic"
				style={{ maxWidth: 600, margin: "40px auto" }}
				layout="vertical"
				initialValues={{ remember: true }}
				onFinish={handleSubmit}
				// onFinishFailed={(errorInfo) => console.log("Failed:", errorInfo)}
				autoComplete="off"
			>
				<Form.Item
					label="Type"
					name="assetType"
					rules={[{ required: true, message: "Please select type!" }]}
				>
					<Select
						options={availableAssets}
						placeholder="Select type"
						value={form.getFieldValue("assetType")}
						onChange={(value) => onChanges(value, "assetType")}
					/>
				</Form.Item>

				<Form.Item
					label="Date"
					name="dateGiven"
					rules={[{ required: true, message: "Please select date!" }]}
				>
					<DatePicker
						style={{ width: "100%" }}
						size="large"
						format="DD/MM/YYYY"
						disabledDate={disabledDate}
						value={form.getFieldValue("dateGiven")}
						onChange={(value) => onChanges(value, "dateGiven")}
					/>
				</Form.Item>

				<Form.Item
					label="Employee"
					name="userName"
					rules={[{ required: true, message: "Please select employee!" }]}
				>
					<AutoComplete
						// options={availableEmployees?.map((option) => ({
						// 	value: option.value,
						// }))}
						// options={[]}
						placeholder="Select employee"
						size="large"
						value={form.getFieldValue("userName")}
						onChange={(value) => onChanges(value, "userName")}
						// filterOption={(inputValue, option) =>
						// 	option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
						// }
					/>
				</Form.Item>
			</Form>
		);
	},
);

export default AddAssetForm;
