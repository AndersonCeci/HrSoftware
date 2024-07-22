import { Flex, Input, Form, Row, Col } from "antd";

type FirstPanelProps = {
	onChange: (value: any, identifier: string) => void;
	form: any;
};

const FirstPanel = ({ onChange, form }: FirstPanelProps) => {
	return (
		<Flex vertical>
			<Row gutter={16}>
				<Col span={10} offset={1}>
					<Form.Item
						label="Name"
						name="name"
						rules={[{ required: true, message: "Please input name!" }]}
					>
						<Input
							size="large"
							placeholder="Enter name"
							value={form.getFieldValue("name")}
							onChange={(e) => onChange(e.target.value, "name")}
						/>
					</Form.Item>
				</Col>
				<Col span={10} offset={1}>
					<Form.Item
						label="Surname"
						name="surname"
						rules={[{ required: true, message: "Please input surname" }]}
					>
						<Input
							size="large"
							placeholder="Enter position"
							value={form.getFieldValue("surname")}
							onChange={(e) => onChange(e.target.value, "surname")}
						/>
					</Form.Item>
				</Col>
			</Row>
			<Row>
				<Col span={10} offset={1}>
					<Form.Item
						label="Email"
						name="email"
						rules={[{ required: true, message: "Please input email!" }]}
					>
						<Input
							size="large"
							placeholder="Enter email"
							value={form.getFieldValue("email")}
							onChange={(e) => onChange(e.target.value, "email")}
						/>
					</Form.Item>
				</Col>
				<Col span={10} offset={1}>
					<Form.Item
						label="Phone"
						name="phone"
						rules={[{ required: true, message: "Please input phone!" }]}
					>
						<Input
							size="large"
							type="number"
							placeholder="Enter phone"
							value={form.getFieldValue("phone")}
							onChange={(e) => onChange(e.target.value, "phone")}
						/>
					</Form.Item>
				</Col>
			</Row>
		</Flex>
	);
};

export default FirstPanel;
