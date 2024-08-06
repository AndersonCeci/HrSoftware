import { InventaryDataType } from "../types/InventaryDataType";
import { Form, Input, Space } from "antd";
import Button from "../../../components/Shared/Button";
import FormInputs from "../../../components/Shared/InputTypes/FormInputs";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import useHttp from "../../../hooks/useHttp";
import { useImperativeHandle, useRef, forwardRef } from "react";

type QuantityFormProps = {
	selectedAsset?: InventaryDataType | null;
	onAdd: (values: string[]) => void;
};

const API = import.meta.env.REACT_APP_INVENTARY_API;

const QuantityForm = forwardRef(({ selectedAsset, onAdd }: QuantityFormProps, ref) => {
	const [form] = Form.useForm();
	const formRef = useRef<any>();
	const [, , sendRequest] = useHttp();

	function onFinish(values: any) {
		// sendRequest(useHttp.postRequestHelper(API, values), (responseData: any) => {
		// 	console.log(responseData);
		// });
		onAdd(values.names);
	}

	useImperativeHandle(ref, () => ({
		submit: () => {
			formRef.current.submit();
		},
	}));

	return (
		<Form form={form} ref={formRef} layout="vertical" autoComplete="off" onFinish={onFinish}>
			<Form.List
				name="names"
				rules={[
					{
						validator: async (_, names) => {
							if (!names || names.length < 1) {
								return Promise.reject(new Error("At least 1 Asset is required"));
							}
						},
					},
				]}
			>
				{(fields, { add, remove }, { errors }) => (
					<>
						{fields.map((field, index) => (
							<Form.Item
								label={index === 0 ? `${selectedAsset?.assetType}'s Code` : ""}
								required={false}
								key={field.key}
							>
								<Form.Item
									{...field}
									validateTrigger={["onChange", "onBlur"]}
									rules={[
										{
											required: true,
											whitespace: true,
											message: `Please input ${selectedAsset?.assetType}'s code or delete this field.`,
										},
									]}
									noStyle
								>
									<Input
										size="large"
										placeholder={`${selectedAsset?.assetType}'s code`}
										style={{ width: "100%" }}
										suffix={
											fields.length > 1 && (
												<MinusCircleOutlined onClick={() => remove(field.name)} />
											)
										}
									/>
								</Form.Item>
							</Form.Item>
						))}
						<Form.Item>
							<Button
								type="dashed"
								size="large"
								onClick={() => add()}
								style={{ width: "100%" }}
								icon={<PlusOutlined />}
							>
								{`Add ${selectedAsset?.assetType}`}
							</Button>
							<Form.ErrorList errors={errors} />
						</Form.Item>
					</>
				)}
			</Form.List>
			{/* <Button htmlType="submit"> send </Button> */}
		</Form>
	);
});

export default QuantityForm;
