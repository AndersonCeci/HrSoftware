import { AssetDatatype } from "../types/AssetsDataType";
import { QuantityFormProps } from "../types/AddAssetsForm";
import { Form, Input } from "antd";
import Button from "../../../components/Shared/Button";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useImperativeHandle, useRef, forwardRef } from "react";
import { t } from "i18next";

const QuantityForm = forwardRef(
	({ selectedAsset, onAddAssetType, onAddQuantity }: QuantityFormProps, ref) => {
		const [form] = Form.useForm();
		const formRef = useRef<any>();

    function onFinish(values: any, identifier: string) {
      selectedAsset
        ? onAddQuantity(values[identifier], selectedAsset.assetName)
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
				onFinish={(values) => onFinish(values, selectedAsset ? "codes" : "assetName")}
			>
				<Form.List
					name={selectedAsset ? "codes" : "assetName"}
					rules={[
						{
							validator: async (_, values) => {
								if (!values || values.length < 1) {
									return Promise.reject(new Error(t("minimumOneRequired")));
								}
							},
						},
						{
							validator: async (_, values) => {
								const uniqueValues = new Set(values);

								if (values.length !== uniqueValues.size) {
									const duplicateValues = new Set(
										values.filter(
											(value: string) => values.indexOf(value) !== values.lastIndexOf(value),
										),
									);
									return Promise.reject(
										new Error(`${t("duplicatedValue")} ${duplicateValues.values().next().value}`),
									);
								}
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
											? `${selectedAsset ? `Add ${selectedAsset.assetName}'s Code` : "Add Asset"}`
											: ""
									}
									name={index}
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
													? `Please input ${selectedAsset?.assetName}'s code or delete this field.`
													: t("pleaseInputAssetTypeOrDeleteThisField"),
											},
										]}
										noStyle
									>
										<Input
											size="large"
											placeholder={
												selectedAsset ? `${selectedAsset.assetName}'s Code` : "Asset Type"
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
									{`${t("add")} ${
										selectedAsset
											? `${selectedAsset.assetName}${t('codeEngOnly')}`
											: t("assetTypeAdd")
									}`}
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
