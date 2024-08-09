import { Col, Form, Row, Flex, Upload } from "antd";
import Button from "../../../components/Shared/Button";
import { EuroCircleOutlined, UploadOutlined } from "@ant-design/icons";
import FormInputs from "../../../components/Shared/InputTypes/FormInputs";
import { ButtonSize } from "../../../enums/Button";
import { getDevRoles } from "../utils/helperFunctions";
import { useTranslation } from "react-i18next";

const SecondStep = () => {
  const position = getDevRoles().map((role) => ({ label: role, value: role }));
  const { t } = useTranslation();
  console.log("position", position);
  position.push({ label: "Project Manager", value: "projectManager" });
  console.log("position", position);
  return (
    <Flex vertical>
      <Row gutter={16}>
        <Col xs={{ offset: 1, span: 23 }} md={{ offset: 1, span: 10 }}>
          <FormInputs.Select
            label={t("position")}
            name="position"
            options={position}
            required
          />
        </Col>
        <Col xs={{ offset: 1, span: 23 }} md={{ offset: 1, span: 10 }}>
          <FormInputs.Input
            label={t("salary")}
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
            label={t("teamLeader")}
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
            label={t("startingOn")}
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
            label={t("contract")}
            name="contract"
            style={{ width: "100%" }}
            // rules={[{ required: true, message: "Please enter a contract" }]}
          >
            <Button size={ButtonSize.LARGE} block icon={<UploadOutlined />}>
              <Upload>{t("clickToUpload")}</Upload>
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Flex>
  );
};

export default SecondStep;
