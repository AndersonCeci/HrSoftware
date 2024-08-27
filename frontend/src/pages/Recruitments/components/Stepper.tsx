import { useState, useEffect } from "react";
import { Button, Checkbox, Col, Row, Form } from "antd";
import { useForm } from "antd/es/form/Form";
import Steps from "../../../components/Shared/Steps";
import { Text } from "../../../components/Shared/Typography";
import { items } from "../columns/constants";
import { useRecruitmentContext } from "../context";
import moment from "moment";

const Stepper = () => {
  const [form] = useForm();
  const [current, setCurrent] = useState(0);
  const { editingRecord, updateApplicant } = useRecruitmentContext();
  const stage =
    current === 1
      ? editingRecord.firstInterview
      : current === 2
      ? editingRecord.secondInterview
      : null;

  const onChange = (value: number) => {
    setCurrent(value);
  };
  useEffect(() => {
    if (editingRecord) {
      form.setFieldsValue({
        name: editingRecord.name,
        surname: editingRecord.surname,
        email: editingRecord.email,
        position: editingRecord.position,
        reference: editingRecord.reference,
      });

      if (stage) {
        form.setFieldsValue({
          ...stage,
          date: stage.date ? moment(stage.date) : null,
        });
      }
    }
  }, [current, editingRecord, form]);

  return (
    <div style={{ paddingTop: 16 }}>
      <Steps
        onChange={onChange}
        current={current}
        direction="horizontal"
        responsive
        items={items.map(({ title, icon }) => ({
          title,
          icon,
        }))}
      />

      <Form form={form} layout="vertical" id={editingRecord._id}>
        <div style={{ justifyItems: "inherit" }}>{items[current].content}</div>

        <Form.Item>
          <Row
            justify="end"
            style={{
              alignItems: "end",
              maxWidth: "100%",
              gap: "10",
            }}
          >
            <Text style={{ paddingRight: 10 }}>Notify applicant</Text>
            <Checkbox onChange={() => {}}></Checkbox>
          </Row>
        </Form.Item>

        <Row gutter={6} style={{ marginTop: 16 }}>
          <Col>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => {
                  console.log("form values", form.getFieldsValue());
                  updateApplicant(editingRecord._id, form.getFieldsValue());
                }}
              >
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
    </div>
  );
};

export default Stepper;
