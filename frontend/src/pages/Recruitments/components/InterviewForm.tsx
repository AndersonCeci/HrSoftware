import React, { useEffect } from "react";
import {
  Form,
  Input,
  DatePicker,
  Button,
  Row,
  Col,
  Select,
  Typography,
  Steps,
} from "antd";
import moment from "moment";
import { useRecruitmentContext } from "../context";
import { RecruitmentStage } from "../columns/constants";

const { Title } = Typography;

const evaluationSteps = [
  {
    title: "Negative",
    status: "error",
    content: "😞",
    value: "Negative",
  },
  {
    title: "Not Sure",
    status: "wait",
    content: "😐",
  },
  {
    title: "OK",
    status: "process",
    content: "👍",
  },
  {
    title: "Positive",
    status: "finish",
    content: "😊",
  },
];

const InterviewForm: React.FC<{ step: string }> = ({ step }) => {
  const [form] = Form.useForm();
  const { editingRecord } = useRecruitmentContext();
  const stage =
    step === RecruitmentStage.FirstInterview
      ? editingRecord.firstInterview
      : editingRecord.secondInterview;

  useEffect(() => {
    if (editingRecord) {
      const formattedValues = {
        ...stage,
        date: stage.date ? moment(stage.date) : null,
      };

      form.setFieldsValue(formattedValues);
    } else {
      console.log("not setting: ");
    }
  }, []);

  return (
    <>
      <Title level={5}>{step}</Title>
      <Form form={form} layout="vertical">
        <Form.Item label="Date" name={"date"}>
          <DatePicker />
        </Form.Item>
        <Form.Item label="Notes" name={"notes"}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Interviewers" name={"interviewers"}>
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
          ></Select>
        </Form.Item>
        <Form.Item label="Evaluation" name={"evaluation"}>
          <Steps
            direction="horizontal"
            responsive
            size="small"
            labelPlacement="vertical"
            current={evaluationSteps.findIndex(
              (item) => item.value === editingRecord?.[step]?.evaluation,
            )}
          >
            {evaluationSteps.map((item, index) => (
              <Steps.Step
                key={index}
                title={item.title}
                icon={<span style={{ width: "10px" }}>{item.content}</span>}
              />
            ))}
          </Steps>
        </Form.Item>
        <Row gutter={16} style={{ marginTop: 16 }}>
          <Col>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button type="default">Reject</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default InterviewForm;
