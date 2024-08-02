import { Form, Input, Flex } from "antd";
import Modal from "../../../components/Shared/Modal";
import FormInputs from "../../../components/Shared/InputTypes/FormInputs";
import { getDevRoles } from "../../Employment/utils/helperFunctions";
import { useRef, useEffect, useState } from "react";
import { RecrutmentDataType } from "../types/RecruitmentDataTypes";
import { references } from "../columns/constants";
import TextField from "../../../components/Shared/TextField";

type EditModalProps = {
	open: boolean;
	onClose: () => void;
	modalTitle: string;
	onSubmit: (values: RecrutmentDataType) => void;
	data: RecrutmentDataType | null;
	options: { value: string; label: string }[];
	handleUploadFile?: () => void;
};

const positions = getDevRoles().map((role) => ({ value: role, label: role }));

const TableModal: React.FC<EditModalProps> = ({
	onClose,
	open,
	modalTitle,
	onSubmit,
	data,
	options,
	handleUploadFile,
}) => {
	const [form] = Form.useForm();
	const formRef = useRef<any>(null);
	const [file, setFile] = useState<File | null>(null);

	useEffect(() => {
		if (data) {
			console.log(data);
			form.setFieldsValue(data);
		}
	}, [data, form]);

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

			form.setFieldsValue({ cv: fileUrl });
			setFile(file);
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
		<Modal isOpen={open} title={modalTitle} onOk={() => form.submit()} onCancel={onClose}>
			<Form ref={formRef} style={{
				marginTop: "1.5rem",
			}} form={form} layout="vertical" onFinish={onSubmit} autoComplete="off">
				<Flex gap={45} >
					<Flex vertical style={{ width: "100%" }}>
						<FormInputs.Input name="name" label="Name" required />
						<FormInputs.Input name="surname" label="Surname" required />
						<FormInputs.Input name="email" label="Email" required defaultValidateRule="email" />
						<Form.Item label="CV" name="cv" valuePropName="cv">
							<Input type="file" name="cv" size="large" onChange={handleFileChange} />
						</Form.Item>
					</Flex>
					<Flex vertical style={{ width: "100%" }}>
						<FormInputs.Select name="stage" label="Stage" options={options} required />
						<FormInputs.Select name="position" label="Position" options={positions} required />
						<FormInputs.Select name="reference" label="Reference" options={references} required />
						<FormInputs.DatePicker
							name="submittedDate"
							label="Date Submitted"
							isDisabledDate
						/>
					</Flex>
				</Flex>
			</Form>
		</Modal>
	);
};

export default TableModal;
