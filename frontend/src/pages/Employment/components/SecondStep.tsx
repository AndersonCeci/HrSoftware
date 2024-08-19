import { Col, Form, Row, Flex, Upload, Input } from "antd";

import { EuroCircleOutlined, UploadOutlined } from "@ant-design/icons";
import FormInputs from "../../../components/Shared/InputTypes/FormInputs";

import { getDevRoles } from "../utils/helperFunctions";
import { useTranslation } from "react-i18next";
import { useState } from "react";
const SecondStep = ({ form }: any) => {
	const { t } = useTranslation();
	// const form = Form.useFormInstance();
	const [file, setFile] = useState<File | undefined>(undefined);

	const position = getDevRoles().map((role) => ({ label: role, value: role }));
	position.push({ label: "Project Manager", value: "projectManager" });

	const handleUpload = async (file: File) => {
		const formData = new FormData();
		formData.append("file", file);
		console.log(formData, "formDataaa");
		try {
			const uploadResponse = await fetch("http://localhost:3000/files/upload", {
				method: "POST",
				body: formData,
			});

			if (!uploadResponse.ok) {
				throw new Error("File upload failed");
			}

			const uploadData = await uploadResponse.json();
			const fileUrl = uploadData.fileUrl;

			form.setFieldsValue({ contract: fileUrl });
			// setFile(file);
		} catch (error) {
			console.error("File upload error:", error);
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		console.log(file, "fileeee");
		if (file) {
			handleUpload(file);
		}
	};

	return (
		<Flex vertical>
			<Row gutter={16}>
				<Col xs={{ offset: 1, span: 23 }} md={{ offset: 1, span: 10 }}>
					<FormInputs.Select label={t("position")} name="position" options={position} required />
				</Col>
				<Col xs={{ offset: 1, span: 23 }} md={{ offset: 1, span: 10 }}>
					<FormInputs.Input
						label={t("salary")}
						name="salary"
						required
						defaultValidateRule="number"
						prefix={<EuroCircleOutlined />}
					/>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col xs={{ offset: 1, span: 23 }} md={{ offset: 1, span: 10 }}>
					<FormInputs.AutoComplete
						label={t("teamLeader")}
						name="teamLeader"
						options={[]}
						// isMatchWithOption
					/>
				</Col>

				<Col xs={{ offset: 1, span: 23 }} md={{ offset: 1, span: 10 }} lg={{ offset: 1, span: 5 }}>
					<FormInputs.DatePicker
						label={t("startingOn")}
						name="startingDate"
						required
						isDisabledDate
					/>
				</Col>
				<Col xs={{ offset: 1, span: 23 }} md={{ offset: 1, span: 21 }} lg={{ offset: 0, span: 5 }}>
					<Form.Item
						label={t("contract")}
						name="contract"
						valuePropName="contract"
						style={{ width: "100%" }}
					>
						<Input type="file" size="large" onChange={handleFileChange} />
					</Form.Item>
				</Col>
			</Row>
		</Flex>
	);
};

export default SecondStep;
