import { Button, Col, Form, Row, message } from "antd";
import { useRecruitmentContext } from "../context";
import FormInputs from "../../../components/Shared/InputTypes/FormInputs";
import { useEffect } from "react";
import { sendMailHelper } from "../../../helpers/mail.helper";

interface EmailContentProps {
  onCancel: () => void;
}

const EmailContent: React.FC<EmailContentProps> = ({ onCancel }) => {
  const [form] = Form.useForm();
  const { editingRecord } = useRecruitmentContext();

  useEffect(() => {
    if (editingRecord) {
      const sender = JSON.parse(
        localStorage.getItem("userData") || "{}"
      )?.email;
      form.setFieldsValue({
        recepient: editingRecord?.email || "",
        sender: sender ?? "",
      });
    }
  }, [editingRecord, form]);

  const handleCancel = () => {
    onCancel();
  };

  const handleSendMail = async () => {
    try {
      const values = await form.validateFields();
      await sendMailHelper({
        sender: values.sender,
        recepients: [values.recepient],
        subject: values.subject,
        template: "interview-template",
        text: values.content,
        closure: values.closure,
      });
      message.success("Mail sent successfully");
    } catch (error) {
      message.error("Failed to send mail");
    } finally {
      handleCancel();
    }
  };

  return (
    <Form form={form} layout="vertical">
      <FormInputs.Input label="Sender" name="sender" required />
      <FormInputs.Input label="Recepient" name="recepient" required />
      <FormInputs.Input label="Subject" name="subject" required />
      <FormInputs.Input
        label="Content"
        name="content"
        type="textarea"
        required
      />
      <FormInputs.Input label="Closure" name="closure" />

      <Row justify="end" gutter={10}>
        <Col>
          <Form.Item>
            <Button type="default" onClick={handleCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item>
            <Button type="primary" onClick={handleSendMail}>
              Send
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default EmailContent;
