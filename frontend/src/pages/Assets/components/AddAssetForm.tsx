import Select from "../../../components/Shared/Select";
import { Form, DatePicker, AutoComplete } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useContext, useRef, useImperativeHandle, forwardRef } from "react";
import { AssetContext } from "../context/asset-context";
import type { AddAssetFormProps, RangePickerProps } from "../types/AddAssetsForm";

dayjs.extend(customParseFormat);
const disabledDate: RangePickerProps["disabledDate"] = (current) => {
	return current && current < dayjs().startOf("day");
};

const AddAssetForm = forwardRef(
	({ availableOptions = [], availableEmployees, onSuccess }: AddAssetFormProps, ref) => {
		const formRef = useRef<any>();

		useImperativeHandle(ref, () => ({
			submit: () => {
				formRef.current.submit();
			},
		}));

		const [form] = Form.useForm();

		function onChanges(value: any, identifier: string) {
			form.setFieldsValue({ [identifier]: value });
			// setNewAsset(identifier, value);
		}

		function handleSubmit(values: any) {
			console.log(values);
			const { type, date, employee } = values;

			const newAsset = {
				id: Math.floor(Math.random() * 1000),
				type: type,
				date: `${dayjs(date).format("DD/MM/YYYY")}`,
				employee: employee,
				code: Math.floor(Math.random() * 100),
			};


			onSuccess(newAsset);
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
					name="type"
					rules={[{ required: true, message: "Please select type!" }]}
				>
					<Select
						options={availableOptions.map((option) => ({
							value: option.value,
							label: option.label,
						}))}
						placeholder="Select type"
						value={form.getFieldValue("type")}
						onChange={(value) => onChanges(value, "type")}
					/>
				</Form.Item>

				<Form.Item
					label="Date"
					name="date"
					rules={[{ required: true, message: "Please select date!" }]}
				>
					<DatePicker
						style={{ width: "100%" }}
						size="large"
						format="DD/MM/YYYY"
						
						disabledDate={disabledDate}
						value={form.getFieldValue("date")}
						onChange={(value) => onChanges(value, "date")}
					/>
				</Form.Item>

				<Form.Item
					label="Employee"
					name="employee"
					rules={[{ required: true, message: "Please select employee!" }]}
				>
					<AutoComplete
						options={availableEmployees?.map((option) => ({
							value: option.value,
						}))}
						placeholder="Select employee"
						size="large"
						value={form.getFieldValue("employee")}
						onChange={(value) => onChanges(value, "employee")}
						filterOption={(inputValue, option) =>
							option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
						}
					/>
				</Form.Item>
			</Form>
		);
	},
);

export default AddAssetForm;
