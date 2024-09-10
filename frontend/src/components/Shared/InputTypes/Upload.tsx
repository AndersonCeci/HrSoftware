import { Upload as UP, Form, Flex } from "antd";
import { RcFile } from "antd/lib/upload/interface";
import Button from "../Button";
import { UploadOutlined } from "@ant-design/icons";

import { useCallback, useState } from "react";

export default function Upload({
	fileList,
	addNewFilesHandler,
	updateFilesUrlHandler,
	name,
	label,
	required,
}: any) {
	const [isUploading, setIsUploading] = useState(false);

	const handleUpload = useCallback(async (files: (RcFile | undefined)[]) => {
		setIsUploading(true);
		const formData = new FormData();
		files = files.filter((file) => file !== undefined);

		files.forEach((file) => {
			formData.append("files", file as File);
		});

		addNewFilesHandler(files);

		try {
			const uploadResponse = await fetch("http://localhost:3000/files/upload", {
				method: "POST",
				body: formData,
			});
			const uploadData = await uploadResponse.json();
			const fileUrls = uploadData.fileUrls;

			updateFilesUrlHandler(fileUrls);
		} catch (error) {
			console.error("File upload error:", error);
		} finally {
			setIsUploading(false);
		}
	}, []);

	return (
		<Form.Item
			label={label}
			name={name}
			rules={[
				{
					required: required,
					message: `Please input your ${label}!`,
				},
			]}
		>
			<Flex className="event-attachment-container">
				<UP
					beforeUpload={() => {
						return false;
					}}
					listType="picture-card"
					multiple
					maxCount={8}
					fileList={fileList}
					onChange={(info) => {
						const files: (RcFile | undefined)[] = info.fileList.map((file) => file.originFileObj);
						if (files) {
							handleUpload(files);
						}
					}}
					disabled={isUploading || fileList.length >= 8}
				>
					<Button
						icon={<UploadOutlined />}
						type="dashed"
						size="large"
						shape="circle"
						disabled={isUploading}
					></Button>
				</UP>
			</Flex>
		</Form.Item>
	);
}
