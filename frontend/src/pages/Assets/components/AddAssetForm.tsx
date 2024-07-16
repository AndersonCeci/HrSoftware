import Button from "../../../components/Shared/Button";
import Select from "../../../components/Shared/Select";
import { ButtonType, ButtonSize } from "../../../enums/Button";

import { Form, Input, DatePicker } from "antd";

type FieldType = {
	type?: string;
	date?: string;
	employee?: string;
};

type AddAssetFormProps = {
	availableOptions: { value: string; label: string }[];
};

const AddAssetForm = ({ availableOptions }: AddAssetFormProps) => {
	const [form] = Form.useForm<FieldType>();
	console.log(availableOptions.map((option) => option.label));

	return (
		<Form
			name="basic"
			style={{ maxWidth: 600, margin: "40px auto" }}
			initialValues={{ remember: true }}
			onFinish={(values) => console.log(values)}
			onFinishFailed={(errorInfo) => console.log("Failed:", errorInfo)}
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
					onChange={(value) => form.setFieldsValue({ type: value })}
				/>
			</Form.Item>
				
			<Form.Item
				label="Date"
				name="date"
				rules={[{ required: true, message: "Please select date!" }]}
			>
				<DatePicker
					style={{ width: "100%" }}
					onChange={(date, dateString) => form.setFieldsValue({ date: dateString })}
				/>

			</Form.Item>

		</Form>
	);
};

export default AddAssetForm;
