import { Flex, Row, Col } from "antd";
import FormInputs from "../../../components/Shared/InputTypes/FormInputs";
import flagOpt from "../utils/flags";

const FirstPanel = () => {
	return (
		<Flex vertical>
			<Row gutter={16}>
				<Col xs={{ offset: 1, span: 23 }} md={{ offset: 1, span: 10 }}>
					<FormInputs.Input label="Name" name="name" required />
				</Col>
				<Col xs={{ offset: 1, span: 23 }} md={{ offset: 1, span: 10 }}>
					<FormInputs.Input label="Surname" name="surname" required />
				</Col>
			</Row>
			<Row>
				<Col xs={{ offset: 1, span: 23 }} md={{ offset: 1, span: 10 }}>
					<FormInputs.Input
						label="Email"
						addonAfter="@codevider.com"
						name="email"
						required
						// defaultValidateRule="email"
					/>
				</Col>
				<Col xs={{ offset: 1, span: 23 }} md={{ offset: 1, span: 10 }}>
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
					<FormInputs.Input
						label="Personal Number"
						name="nID"
						required
						defaultValidateRule="personalNumber"
					/>
				</Col>
				<Col xs={{ offset: 1, span: 23 }} md={{ offset: 1, span: 10 }}>
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
