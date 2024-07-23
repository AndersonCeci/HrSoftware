import { Col, DatePicker, Form, Input, Row, Select, Flex, Upload, InputNumber } from "antd";
import Button from "../../../components/Shared/Button";
import { EuroCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { GetProps } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { ButtonSize } from "../../../enums/Button";
import { getDevRoles } from "../utils/helperFunctions";

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
	const position = getDevRoles().map((role) => ({ label: role, value: role }));

	return (
		<Flex vertical>
			<Row gutter={16}>
				<Col xs={{ offset: 1, span: 23 }} md={{ offset: 1, span: 10 }}>
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
				<Col xs={{ offset: 1, span: 23 }} md={{ offset: 1, span: 10 }}>
					<Form.Item
						label="Salary"
						name="salary"
						rules={[{ required: true, message: "Please enter valid salary" }]}
					>
						<InputNumber
							min={1}
							addonBefore={<EuroCircleOutlined style={{ color: "#c8c8c8" }} />}
							size="large"
							type="number"
							placeholder="Enter a salary amount"
							style={{ width: "100%" }}
							value={form.getFieldValue("salary")}
							onChange={(value) => onChange(value, "salary")}
						/>
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col xs={{ offset: 1, span: 23 }} md={{ offset: 1, span: 10 }}>
					<Form.Item
						label="Team Leader"
						name="teamLeader"
						rules={[{ message: "Please enter a team leader" }]}
					>
						<Input
							size="large"
							placeholder="Enter a team leader"
							value={form.getFieldValue("teamLeader")}
							onChange={(e) => onChange(e.target.value, "teamLeader")}
						/>
					</Form.Item>
				</Col>

				<Col xs={{ offset: 1, span: 23 }} md={{ offset: 1, span: 10 }} lg={{ offset: 1, span: 5 }}>
					<Form.Item
						label="Starting on"
						name="startingDate"
						// rules={[{ required: true, message: "Please enter a starting date" }]}
					>
						<DatePicker
							size="large"
							style={{ width: "100%" }}
							format={"DD/MM/YYYY"}
							disabledDate={disabledDate}
							value={form.getFieldValue("startingDate")}
							onChange={(value) => onChange(value, "startingDate")}
						/>
					</Form.Item>
				</Col>

				<Col xs={{ offset: 1, span: 23 }} md={{ offset: 1, span: 21 }} lg={{ offset: 0, span: 5 }}>
					<Form.Item
						label="Contract"
						name="contract"
						style={{ width: "100%" }}
						// rules={[{ required: true, message: "Please enter a contract" }]}
					>
						<Button size={ButtonSize.LARGE} block icon={<UploadOutlined />}>
							<Upload>Click to upload</Upload>
						</Button>
					</Form.Item>
				</Col>
			</Row>
		</Flex>
	);
};

export default SecondStep;
