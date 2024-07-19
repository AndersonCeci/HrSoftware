import { Button, Col, DatePicker, Form, Input, Row, Select, Flex, Upload } from "antd";
// import { useRef} from "react";
import { EuroCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { MdUploadFile } from "react-icons/md";
import { GetProps } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { useState } from "react";

type SecondStepProps = {
	onChange: (value: any, identifier: string) => void;
	form: any;
};

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

dayjs.extend(customParseFormat);
const disabledDate: RangePickerProps["disabledDate"] = (current) => {
	return current && current < dayjs().startOf("day");
};

const SecondStep = ({ onChange, form }: SecondStepProps) => {
	// const addWorkerFormRef = useRef(: );
	const [file, setFile] = useState(null);

	const position = [
		{ label: "Frontend Developer", value: "frontend" },
		{ label: "Backend Developer", value: "backend" },
		{ label: "Fullstack Developer", value: "fullstack" },
	];

	console.log(file, "file");

	return (
		<Flex vertical>
			<Row gutter={16}>
				<Col offset={1} span={10}>
					<Form.Item
						label="Position"
						name="position"
						rules={[{ required: true, message: "Plese enter an position" }]}
					>
						<Select
							size="large"
							options={position}
							placeholder="Choose a position"
							value={form.getFieldValue("position")}
							onChange={(value) => onChange(value, "position")}
						/>
					</Form.Item>
				</Col>
				<Col offset={1} span={10}>
					<Form.Item
						label="Salary"
						name="salary"
						rules={[{ required: true, message: "Please enter a password" }]}
					>
						<Input
							prefix={<EuroCircleOutlined style={{ color: "#c8c8c8" }} />}
							size="large"
							placeholder="Enter a salary amount"
							type="number"
							value={form.getFieldValue("salary")}
							onChange={(e) => onChange(e.target.value, "salary")}
						/>
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col offset={1} span={10}>
					<Form.Item
						label="Team Leader"
						name="teamLeader"
						rules={[{ required: true, message: "Please enter a team leader" }]}
					>
						<Select
							size="large"
							options={position}
							placeholder="Choose a team leader"
							value={form.getFieldValue("teamLeader")}
							onChange={(value) => onChange(value, "teamLeader")}
						/>
					</Form.Item>
				</Col>

				<Col offset={1} span={5}>
					<Form.Item
						label="Starting on"
						name="starting"
						rules={[{ required: true, message: "Please enter a starting date" }]}
					>
						<DatePicker
							size="large"
							style={{ width: "100%" }}
							format={"MM/DD/YYYY"}
              disabledDate={disabledDate}
							value={form.getFieldValue("starting")}
							onChange={(value) => onChange(value, "starting")}
						/>
					</Form.Item>
				</Col>

				<Col offset={1} span={5}>
					<Form.Item
						label="Contract"
						name="contract"
						rules={[{ required: true, message: "Please enter a contract" }]}
					>
						<Upload>
							<Button
								size="large"
								style={{ width: 180, color: "#c8c8c8" }}
								icon={<UploadOutlined />}
								block
								// onClick={(e) => {
								//   e.preventDefault();
								//   console.log("clicked");
								//   setFile(e.target.files[0]);
								// }}
							>
								Click to upload
							</Button>
						</Upload>
					</Form.Item>
				</Col>
			</Row>
		</Flex>
	);
};

export default SecondStep;
