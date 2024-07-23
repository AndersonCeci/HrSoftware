import { Flex, Input, Select, Form, Row, Col } from "antd";

type FirstPanelProps = {
	onChange: (value: any, identifier: string) => void;
	form: any;
};

// const genders = [
// 	{ label: "Male", value: "Male" },
// 	{ label: "Female", value: "Female" },
// 	{ label: "Non-binary", value: "Non-binary" },
// 	{ label: "Genderqueer", value: "Genderqueer" },
// 	{ label: "Genderfluid", value: "Genderfluid" },
// 	{ label: "Agender", value: "Agender" },
// 	{ label: "Bigender", value: "Bigender" },
// 	{ label: "Demiboy", value: "Demiboy" },
// 	{ label: "Demigirl", value: "Demigirl" },
// 	{ label: "Two-Spirit", value: "Two-Spirit" },
// 	{ label: "Androgynous", value: "Androgynous" },
// 	{ label: "Intersex", value: "Intersex" },
// 	{ label: "Pangender", value: "Pangender" },
// 	{ label: "Neutrois", value: "Neutrois" },
// 	{ label: "Polygender", value: "Polygender" },
// 	{ label: "Third Gender", value: "Third Gender" },
// 	{ label: "Maverique", value: "Maverique" },
// 	{ label: "Aliagender", value: "Aliagender" },
// 	{ label: "Gender Apathetic", value: "Gender Apathetic" },
// 	{ label: "Gender Nonconforming", value: "Gender Nonconforming" },
// 	{ label: "Gender Variant", value: "Gender Variant" },
// 	{ label: "Graygender", value: "Graygender" },
// 	{ label: "Cisgender", value: "Cisgender" },
// 	{ label: "Transgender", value: "Transgender" },
// 	{ label: "Hijra", value: "Hijra" },
// 	{ label: "Other", value: "Other", disabled: true }
//   ];
  

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
						name="phoneNumber"
						rules={[{ required: true, message: "Please input phone!" }]}
					>
						<Input
							size="large"
							type="number"
							placeholder="Enter phone"
							value={form.getFieldValue("phoneNumber")}
							onChange={(e) => onChange(e.target.value, "phoneNumber")}
						/>
					</Form.Item>
				</Col>
			</Row>
			<Row>
				<Col span={10} offset={1}>
					<Form.Item
						label="Personal Number"
						name="nID"
						rules={[{ required: true, message: "Please input personal Number!" }]}
					>
						<Input
							maxLength={10}
							size="large"
							placeholder="Enter personal number"
							value={form.getFieldValue("nID")}
							onChange={(e) => onChange(e.target.value, "nID")}
						/>
					</Form.Item>
				</Col>
				<Col span={10} offset={1}>
					<Form.Item
						label="Gender"
						name="gender"
						rules={[{ required: true, message: "Please input a valid gender" }]}
					>
						<Select
							size="large"
							options={[
								{ label: "Male", value: "Male" },
								{ label: "Female", value: "Female" },
								{ label: "Other", value: "Other", disabled: true },
							]}
							placeholder="Choose a position"
							value={form.getFieldValue("gender")}
							onChange={(value) => onChange(value, "gender")}
						/>
					</Form.Item>
				</Col>
			</Row>
		</Flex>
	);
};

export default FirstPanel;
