import { Flex, Input, Select, Form, Row, Col } from "antd";
import FormInputs from "../../../components/Shared/InputTypes/FormInputs";

const FirstPanel = () => {
	return (
		<Flex vertical>
			<Row gutter={16}>
				<Col xs={{ offset: 1, span: 23 }} md={{ offset: 1, span: 10 }}>
					{/* <Form.Item
						label="Name"
						name="name"
						rules={[
							{
								required: true,
								whitespace: true,
								message: "Please input name!",
							},
						]}
					>
						<Input
							size="large"
							placeholder="Enter name"
							value={form.getFieldValue("name")}
							onChange={(e) => onChange(e.target.value, "name")}
						/>
					</Form.Item> */}
					<FormInputs.Input label="Name" name="name" required />
				</Col>
				<Col xs={{ offset: 1, span: 23 }} md={{ offset: 1, span: 10 }}>
					{/* <Form.Item
						label="Surname"
						name="surname"
						rules={[
							{
								required: true,
								whitespace: true,
								message: "Please input surname",
							},
						]}
					>
						<Input
							size="large"
							placeholder="Enter Surname"
							value={form.getFieldValue("surname")}
							onChange={(e) => onChange(e.target.value, "surname")}
						/>
					</Form.Item> */}
					<FormInputs.Input label="Surname" name="surname" required />
				</Col>
			</Row>
			<Row>
				<Col xs={{ offset: 1, span: 23 }} md={{ offset: 1, span: 10 }}>
					{/* <Form.Item
						label="Email"
						name="email"
						rules={[
							{ required: true, message: "Please input email!" },
							{
								type: "email",
								message: "Please input a valid email",
								validateTrigger: "onBlur",
							},
						]}
					>
						<Input
							size="large"
							placeholder="Enter email"
							value={form.getFieldValue("email")}
							onChange={(e) => onChange(e.target.value, "email")}
						/>
					</Form.Item> */}
					<FormInputs.Input label="Email" name="email" required defaultValidateRule="email" />
				</Col>
				<Col xs={{ offset: 1, span: 23 }} md={{ offset: 1, span: 10 }}>
					{/* <Form.Item
						label="Phone"
						name="phoneNumber"
						rules={[
							{ required: true, message: "Please input phone!" },
							{
								min: 10,
								message: "Please input a valid phone number",
								validateTrigger: "onBlur",
							},
						]}
					>
						<Input
							size="large"
							type="number"
							placeholder="Enter phone"
							value={form.getFieldValue("phoneNumber")}
							onChange={(e) => onChange(e.target.value, "phoneNumber")}
						/>
					</Form.Item> */}
					<FormInputs.Input
						label="Phone Number"
						name="phoneNumber"
						required
						defaultValidateRule="phoneNumber"
					/>
				</Col>
			</Row>
			<Row>
				<Col xs={{ offset: 1, span: 23 }} md={{ offset: 1, span: 10 }}>
					{/* <Form.Item
						label="Personal Number"
						name="nID"
						rules={[
							{ required: true, whitespace: true, message: "Please input personal Number!" },
							{
								min: 10,
								message: "Please input a valid personal number",
								validateTrigger: "onBlur",
							},
						]}
					>
						<Input
							maxLength={10}
							size="large"
							placeholder="Enter personal number"
							value={form.getFieldValue("nID")}
							onChange={(e) => onChange(e.target.value, "nID")}
						/>
					</Form.Item> */}
					<FormInputs.Input
						label="Personal Number"
						name="personalNumber"
						required
						defaultValidateRule="personalNumber"
					/>
				</Col>
				<Col xs={{ offset: 1, span: 23 }} md={{ offset: 1, span: 10 }}>
					{/* <Form.Item
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
							placeholder="Provide a gender"
							value={form.getFieldValue("gender")}
							onChange={(value) => onChange(value, "gender")}
						/>
					</Form.Item> */}
					<FormInputs.Select
						label="Gender"
						name="gender"
						options={[
							{ label: "Male", value: "Male" },
							{ label: "Female", value: "Female" },
							{ label: "Other", value: "Other" },
						]}
						required
					/>
				</Col>
			</Row>
		</Flex>
	);
};

export default FirstPanel;
