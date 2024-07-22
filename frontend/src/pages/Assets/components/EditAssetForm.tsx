import { useRef, useImperativeHandle, forwardRef } from "react";
import { Form, DatePicker, AutoComplete } from "antd";
import Select from "../../../components/Shared/Select";
import dayjs from "dayjs";
import { AssetDatatype } from "../types/AssetsDataType";
import { HTTP } from "../Enum/http";

type EditAssetFormProps = {
	selectedElement: any;
	availableOptions: any[];
	availableEmployees: any[];
	onSuccess: (newAsset: AssetDatatype) => void;
};

const EditAssetForm = forwardRef(
	(
		{ selectedElement, availableOptions, availableEmployees, onSuccess }: EditAssetFormProps,
		ref,
	) => {
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
		const initialValues = {
			assetType: selectedElement.assetType,
			dateGiven: dayjs(selectedElement.dateGiven, "D/M/YYYY"),
			userName: selectedElement.userName,
		};

		useImperativeHandle(ref, () => ({
			submit: () => {
				formRef.current.submit();
			},
		}));

		const [form] = Form.useForm();

		function onChanges(value: any, identifier: string) {
			form.setFieldsValue({ [identifier]: value });
		}

		function onFinish(values: any) {
			const { dateGiven } = values;

			const newAsset = {
				_id: selectedElement._id,
				assetType: values.assetType,
				dateGiven: `${dateGiven.$D}/${dateGiven.$M + 1}/${dateGiven.$y}`,
				userName: values.userName,
				assetCode: selectedElement.assetCode,
			};

			async function handleAssetEdit(newAsset: AssetDatatype) {
				console.log("EDITING", `${HTTP.EDITASSET}/${newAsset._id}`);

				try {
					const response = await fetch(`${HTTP.EDITASSET}/${newAsset._id}`, {
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							assetType: newAsset.assetType,
							dateGiven: newAsset.dateGiven,
							userName: newAsset.userName,
						}),
					});
					if (!response.ok) {
						throw new Error("Failed to edit asset");
					}

					onSuccess(newAsset);
				} catch (error) {
					console.error(error);
				}
			}

			handleAssetEdit(newAsset);
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
						placeholder={selectedElement.userName}
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
	},
);

export default EditAssetForm;
