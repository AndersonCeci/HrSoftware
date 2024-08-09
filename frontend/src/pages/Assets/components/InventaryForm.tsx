import { InventaryDataType } from "../types/InventaryDataType";
import { Form, Input } from "antd";
import Button from "../../../components/Shared/Button";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useImperativeHandle, useRef, forwardRef } from "react";

type QuantityFormProps = {
	selectedAsset?: InventaryDataType | null;
	onAddAssetType: (values: string[]) => void;
	onAddQuantity: (values: string[], assetType: string) => void;
};

const API = import.meta.env.REACT_APP_INVENTARY_API;

const QuantityForm = forwardRef(
	({ selectedAsset, onAddAssetType, onAddQuantity }: QuantityFormProps, ref) => {
		const [form] = Form.useForm();
		const formRef = useRef<any>();

		function onFinish(values: any, identifier: string) {
			selectedAsset
				? onAddQuantity(values[identifier], selectedAsset.assetType)
				: onAddAssetType(values[identifier]);
		}

		useImperativeHandle(ref, () => ({
			submit: () => {
				formRef.current.submit();
			},
		}));

		return (
			<Form
				form={form}
				ref={formRef}
				layout="vertical"
				autoComplete="off"
				onFinish={(values) => onFinish(values, selectedAsset ? "codes" : "assetTypes")}
			>
				<Form.List
					name={selectedAsset ? "codes" : "assetTypes"}
					rules={[
						{
							validator: async (_, values) => {
								if (!values || values.length < 1) {
									return Promise.reject(new Error("At least 1 Asset is required"));
								}
								// dont add same code twice

								// if (values.length !== new Set(values).size) {
								// 	console.log(values, "values", new Set(values), "set");

								// 	return Promise.reject(new Error("Asset Type already exists"));
								// }
							},
						},
					]}
				>
					{(fields, { add, remove }, { errors }) => (
						<>
							{fields.map((field, index) => (
								<Form.Item
									label={
										index === 0
											? `${selectedAsset ? `Add ${selectedAsset.assetType}'s Code` : "Add Asset"}`
											: ""
									}
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
												message: selectedAsset
													? `Please input ${selectedAsset?.assetType}'s code or delete this field.`
													: "Please input asset type or delete this field.",
											},
										]}
										noStyle
									>
										<Input
											size="large"
											placeholder={
												selectedAsset ? `${selectedAsset.assetType}'s Code` : "Asset Type"
											}
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
									{`Add ${selectedAsset ? `${selectedAsset.assetType}'s Code` : "Asset Type"}`}
								</Button>
								<Form.ErrorList errors={errors} />
							</Form.Item>
						</>
					)}
				</Form.List>
			</Form>
		);
	},
);

export default QuantityForm;
