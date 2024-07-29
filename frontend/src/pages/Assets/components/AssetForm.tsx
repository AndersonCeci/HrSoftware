import { useRef, useImperativeHandle, forwardRef } from "react";
import { Form, DatePicker, AutoComplete } from "antd";
import FormInputs from "../../../components/Shared/InputTypes/FormInputs";
import Select from "../../../components/Shared/Select";
import dayjs from "dayjs";
import { AssetDatatype } from "../types/AssetsDataType";
import { HTTP } from "../Enum/http";
import useHttp from "../../../hooks/useHttp";
import { availableAssets } from "../utils/AllAssets";

type EditAssetFormProps = {
	selectedElement?: AssetDatatype | undefined;
	onAdd: (newAsset: AssetDatatype) => void;
	onEdit: (editedAsset: AssetDatatype) => void;
};

const AssetForm = forwardRef(({ selectedElement, onAdd, onEdit }: EditAssetFormProps, ref) => {
	const formRef = useRef<any>();
	const [form] = Form.useForm();
	const [, , sendRequest] = useHttp();

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
			layout="vertical"
			initialValues={initialValues}
			autoComplete="off"
			onFinish={onFinish}
		>
			{/* <Form.Item label="Type" name="assetType">
				<Select
					options={availableAssets}
					// defaultValue={selectedElement.type}
					// placeholder={selectedElement.type}
					value={form.getFieldValue("assetType")}
					onChange={(value) => onChanges(value, "assetType")}
				/>
			</Form.Item> */}
			<FormInputs.Select label="Type" name="assetType" required options={availableAssets} />

			{/* <Form.Item label="Date" name="dateGiven">
				<DatePicker
					style={{ width: "100%" }}
					size="large"
					format="DD/MM/YYYY"
					disabledDate={(current) => current && current < dayjs().startOf("day")}
					// placeholder={selectedElement.date}
					value={form.getFieldValue("dateGiven")}
					onChange={(value) => onChanges(value, "dateGiven")}
				/>
			</Form.Item> */}
			<FormInputs.DatePicker label="Date Given" name="dateGiven" required isDisabledDate />

			{/* <Form.Item label="Employee" name="userName">
				<AutoComplete
					options={[]}
					size="large"
					value={form.getFieldValue("userName")}
					// onChange={(value) => onChanges(value, "userName")}
					// filterOption={(inputValue, option) =>
					// 	option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
					// }
				/>
			</Form.Item> */}
			<FormInputs.AutoComplete label="Employee" name="userName" required options={[]} />
		</Form>
	);
});

export default AssetForm;
