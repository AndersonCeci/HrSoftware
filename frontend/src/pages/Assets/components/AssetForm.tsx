import { useRef, useImperativeHandle, forwardRef, useEffect, useState } from "react";
import { Form } from "antd";
import FormInputs from "../../../components/Shared/InputTypes/FormInputs";
import dayjs from "dayjs";
import useHttp from "../../../hooks/useHttp";
import { availableAssets } from "../utils/AllAssets";
import { AssetFormProps } from "../types/AddAssetsForm";

const API = import.meta.env.REACT_APP_ASSET_API;
const EMPLOYEE = import.meta.env.REACT_APP_EMPLOYEE_API;

const AssetForm = forwardRef(({ selectedElement, onAdd, onEdit }: AssetFormProps, ref) => {
	const formRef = useRef<any>();
	const [form] = Form.useForm();
	const [employeeList, setEmployeeList] = useState<any[]>([]);
	const [, , sendRequest] = useHttp();

	useEffect(() => {
		sendRequest({ url: `${EMPLOYEE}/usernames` }, (responseData: any) =>
			setEmployeeList(responseData),
		);
	}, []);

	console.log("HELLO", employeeList);

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

	function onFinish(values: any) {
		const { dateGiven } = values;

		const newAsset = {
			_id: selectedElement?._id,
			assetType: values.assetType,
			dateGiven: dayjs(dateGiven).format("D/M/YYYY"),
			userName: values.userName,
		};

		sendRequest(
			{
				url: `${API}/${selectedElement ? selectedElement._id : ""}`,
				method: selectedElement ? "PATCH" : "POST",
				headers: { "Content-Type": "application/json" },
				body: newAsset,
			},
			(responseData: any) => {
				console.log(responseData);
				// onEdit(responseData);
				selectedElement ? onEdit(responseData) : onAdd(responseData);
			},
		);
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
			<FormInputs.Select label="Type" name="assetType" required options={availableAssets} />
			<FormInputs.DatePicker label="Date Given" name="dateGiven" required isDisabledDate />
			<FormInputs.AutoComplete
				label="Employee"
				name="userName"
				required
				options={employeeList}
				isMatchWithOption
			/>
		</Form>
	);
});

export default AssetForm;
