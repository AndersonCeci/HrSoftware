import { Input, Select, Modal, Form, DatePicker, Button } from "antd";
import moment from "moment";
import "../styles/TaskGrid.css";
import { t } from "i18next";
import { statusOptions } from "../utils";


type ReminderProps = {
  setIsVisible: (value: boolean) => void;
  isVisible: boolean;
  handleSubmit: any;
  form2: any;
};

export default function ReminderForm({
  setIsVisible,
  isVisible,
  handleSubmit,
  form2,
}: ReminderProps) {

  const { Option } = Select;

  return (
    <Modal
      open={isVisible}
      footer={null}
      onCancel={() => {
        setIsVisible(false);
      }}
      title={t("addNewReminder")}
    >
      <Form form={form2} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Title"
          name="reminderTitle"
          rules={[
            { required: true, message: "Please enter the title" },
            { max: 100 },
          ]}
        >
          <Input placeholder="Enter the title" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="message"
          rules={[
            { required: true, message: "Please enter the description" },
            { max: 1000 },
          ]}
        >
          <Input.TextArea placeholder="Enter the description" />
        </Form.Item>
        <Form.Item
          label="Due Date"
          name="due_date"
          rules={[
            {
              validator: (_, value) => {
                if (value && value < moment().startOf("day")) {
                  return Promise.reject(
                    new Error("Due date cannot be earlier than today")
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <DatePicker format={"MM/DD/YYYY"} />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          initialValue="TO DO"
          rules={[{ required: true, message: "Please choose the status" }]}
        >
          <Select placeholder="Select status">
            {statusOptions.map((status) => (
              <Option key={status.value} value={status.value}>
                {status.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button className="Submit-btn" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
