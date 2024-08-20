import { Flex, Row, Col, Space } from "antd";
import FormInputs from "../../../components/Shared/InputTypes/FormInputs";
import flagOpt from "../utils/flags";
import { useTranslation } from "react-i18next";

const FirstPanel = () => {
	const { t } = useTranslation();
	return (
		<Flex vertical>
			<Row gutter={16}>
				<Col xs={{ offset: 1, span: 23 }} md={{ offset: 1, span: 10 }}>
					<FormInputs.Input label={t("name")} name="name" required />
				</Col>
				<Col xs={{ offset: 1, span: 23 }} md={{ offset: 1, span: 10 }}>
					<FormInputs.Input label={t("surname")} name="surname" required />
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
						label={t("phoneNumber")}
						name="phoneNumber"
						required
						defaultValidateRule="phoneNumber"
					/>
				</Col>
			</Row>
			<Row gutter={10}>
				<Col xs={{ offset: 1, span: 23 }} md={{ offset: 1, span: 5 }}>
					<FormInputs.Input
						label={t("personalNumber")}
						name="nID"
						required
						defaultValidateRule="personalNumber"
					/>
				</Col>
				<Col xs={{ offset: 1, span: 23 }} md={{ offset: 0, span: 5 }}>
					<FormInputs.DatePicker label={t("birthDate")} name="birthDate" required />
				</Col>
				<Col xs={{ offset: 1, span: 23 }} md={{ offset: 1, span: 10 }}>
					<FormInputs.Select
						label={t("gender")}
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
