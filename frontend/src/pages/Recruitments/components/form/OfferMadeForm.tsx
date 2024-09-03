import { Form, Input } from "antd";
import { Col, Row, Select } from "antd/lib";
import FormInputs from "../../../../components/Shared/InputTypes/FormInputs";
import { ContractTypes } from "../../columns/constants";

const OfferMadeForm: React.FC = () => {
  const contactTypeOptions = Object.values(ContractTypes).map((type) => ({
    label: type,
    value: type,
  }));
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Offered Salary" name="offeredSalary">
            <Input type="number" style={{ height: "40px" }}></Input>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Contract Type" name="contractType">
            <Select
              options={contactTypeOptions}
              style={{ width: "100%", height: "40px" }}
            ></Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormInputs.DatePicker label="Start Date" name="startDate" />
        </Col>
      </Row>
    </>
  );
};

export default OfferMadeForm;
