import { Button, Col, Form, Row, message } from "antd";
import { useRecruitmentContext } from "../context";
import FormInputs from "../../../components/Shared/InputTypes/FormInputs";
import { useEffect } from "react";
import { sendMailHelper } from "../../../helpers/mail.helper";
import { RecruitmentStage } from "../columns/constants";

interface EmailContentProps {
  isForRejection: boolean;
  onCancel: () => void;
}

const EmailContent: React.FC<EmailContentProps> = ({
  onCancel,
  isForRejection,
}) => {
  const [form] = Form.useForm();
  const { editingRecord, updateApplicant } = useRecruitmentContext();

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
  }, [editingRecord]);
  const handleRejection = async () => {
    try {
      const values = await form.validateFields();
      await updateApplicant(
        editingRecord._id,
        {
          stage: RecruitmentStage.Rejected,
          rejectReason: values.rejectReason,
        },
        0
      );
      message.success("Applicant rejected successfully");
    } catch (error) {
      message.error("Failed to change applicant status");
    }
  };

  const handleSendMail = async (values: any) => {
    try {
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
      onCancel();
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (isForRejection) {
        await handleRejection();
      }
      await handleSendMail(values);
    } catch (error) {
      console.error("Validation or submission failed:", error);
    }
  };
  return (
    <Form form={form} layout="vertical">
      {isForRejection && (
        <FormInputs.Input
          label="Reject reason"
          name="rejectReason"
          type="textarea"
          required
        />
      )}
      <FormInputs.Input label="Sender" name="sender" required />
      <FormInputs.Input label="Recepient" name="recepient" required />
      <FormInputs.Input label="Subject" name="subject" required />
      <FormInputs.Input
        label="Content"
        name="content"
        type="textarea"
        required
      />
      <FormInputs.Input label="Closure" name="closure" required />

      <Row justify="end" gutter={10}>
        <Col>
          <Form.Item>
            <Button type="default" onClick={onCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item>
            <Button type="primary" onClick={handleSubmit}>
              Send
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default EmailContent;
