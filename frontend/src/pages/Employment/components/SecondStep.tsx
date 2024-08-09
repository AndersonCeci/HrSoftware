import { Col, Form, Row, Flex, Upload } from "antd";
import Button from "../../../components/Shared/Button";
import { EuroCircleOutlined, UploadOutlined } from "@ant-design/icons";
import FormInputs from "../../../components/Shared/InputTypes/FormInputs";
import { ButtonSize } from "../../../enums/Button";
import { getDevRoles } from "../utils/helperFunctions";

const SecondStep = () => {
	const position = getDevRoles().map((role) => ({ label: role, value: role }));
	console.log("position", position);
	position.push({ label: "Project Manager", value: "projectManager" });
	console.log("position", position);
	return (
		<Flex vertical>
			<Row gutter={16}>
				<Col xs={{ offset: 1, span: 23 }} md={{ offset: 1, span: 10 }}>
					<FormInputs.Select label="Position" name="position" options={position} required />
				</Col>
				<Col xs={{ offset: 1, span: 23 }} md={{ offset: 1, span: 10 }}>
					<FormInputs.Input
						label="Salary"
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
						label="Team Leader"
						name="teamLeader"
						options={[]}
						// isMatchWithOption
					/>
				</Col>

        <Col
          xs={{ offset: 1, span: 23 }}
          md={{ offset: 1, span: 10 }}
          lg={{ offset: 1, span: 5 }}
        >
          <FormInputs.DatePicker
            label="Starting on"
            name="startingDate"
            required
            isDisabledDate
          />
        </Col>
        <Col
          xs={{ offset: 1, span: 23 }}
          md={{ offset: 1, span: 21 }}
          lg={{ offset: 0, span: 5 }}
        >
          <Form.Item
            label="Contract"
            name="contract"
            style={{ width: "100%" }}
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
