import { useRef, useImperativeHandle, forwardRef } from "react";
import { Form, DatePicker, AutoComplete } from "antd";
import Select from "../../../components/Shared/Select";
import dayjs from "dayjs";
import { AssetDatatype } from "../types/AssetsDataType";
import { HTTP } from "../Enum/http";
import useHttp from "../../../hooks/useHttp";

type EditAssetFormProps = {
	selectedElement?: AssetDatatype | undefined;
	onAdd: (newAsset: AssetDatatype) => void;
	onEdit: (editedAsset: AssetDatatype) => void;
};

const AssetForm = forwardRef(({ selectedElement, onAdd, onEdit }: EditAssetFormProps, ref) => {
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

	const formRef = useRef<any>();
	const [form] = Form.useForm();
	const [isLoading, error, sendRequest] = useHttp();

	const initialValues = {
		assetType: selectedElement ? selectedElement.assetType : "",
		dateGiven: selectedElement ? dayjs(selectedElement.dateGiven, "D/M/YYYY") : dayjs(),
		userName: selectedElement ? selectedElement.userName : "",
	};

	useImperativeHandle(ref, () => ({
		submit: () => {
			formRef.current.submit();
		},
	}));

	function onChanges(value: any, identifier: string) {
		form.setFieldsValue({ [identifier]: value });
	}

	function onFinish(values: any) {
		const { dateGiven } = values;

		const newAsset = {
			_id: selectedElement?._id,
			assetType: values.assetType,
			dateGiven: dayjs(dateGiven).format("D/M/YYYY"),
			userName: values.userName,
		};

		console.log(newAsset);

		if (selectedElement) {
			sendRequest(
				{
					url: `${HTTP.EDITASSET}/${selectedElement._id}`,
					method: "PATCH",
					headers: { "Content-Type": "application/json" },
					body: newAsset,
				},
				(responseData: any) => {
					console.log(responseData);
					onEdit(responseData);
				},
			);
		} else {
			sendRequest(
				{
					url: `${HTTP.ADDASSET}`,
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: newAsset,
				},
				(responseData: any) => {
					console.log(responseData);
					onAdd(responseData);
				},
			);
		}
	}

	return (
		<Form
			form={form}
			ref={formRef}
			style={{ maxWidth: 600, margin: "40px auto" }}
			layout="vertical"
			initialValues={initialValues}
			autoComplete="off"
			onFinish={onFinish}
		>
			<Form.Item label="Type" name="assetType">
				<Select
					options={availableAssets}
					// defaultValue={selectedElement.type}
					// placeholder={selectedElement.type}
					value={form.getFieldValue("assetType")}
					onChange={(value) => onChanges(value, "assetType")}
				/>
			</Form.Item>

			<Form.Item label="Date" name="dateGiven">
				<DatePicker
					style={{ width: "100%" }}
					size="large"
					format="DD/MM/YYYY"
					disabledDate={(current) => current && current < dayjs().startOf("day")}
					// placeholder={selectedElement.date}
					value={form.getFieldValue("dateGiven")}
					onChange={(value) => onChanges(value, "dateGiven")}
				/>
			</Form.Item>

			<Form.Item label="Employee" name="userName">
				<AutoComplete
					options={[]}
					size="large"
					value={form.getFieldValue("userName")}
					// onChange={(value) => onChanges(value, "userName")}
					// filterOption={(inputValue, option) =>
					// 	option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
					// }
				/>
			</Form.Item>
		</Form>
	);
});

export default AssetForm;
