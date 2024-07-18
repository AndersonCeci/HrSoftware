import { Input, DatePicker, TimePicker, Typography } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Title } = Typography;

const EditNewEventForm = ({ newEvent, onChanges }: any) => {
  return (
    <>
      <Title level={5}>Title*</Title>
      <Input
        placeholder="Title"
        name="title"
        value={newEvent.title}
        onChange={(e) => onChanges(e.target.value, "title")}
      />
      <div style={{ margin: "24px 0" }} />
      <Title level={5}>Description</Title>
      <TextArea
        placeholder="Description"
        autoSize={{ minRows: 3, maxRows: 5 }}
        name="description"
        value={newEvent.description}
        onChange={(e) => onChanges(e.target.value, "description")}
      />
      <Title level={5}>Start Date*</Title>
      <DatePicker
        onChange={(value) => onChanges(value, "startDate")}
        className="modal-date-picker"
        value={newEvent.startDate}
      />
      <Title level={5}>End Date</Title>
      <DatePicker
        onChange={(value) => onChanges(value, "endDate")}
        className="modal-date-picker-end"
        value={newEvent.endDate}
      />
      <Title level={5}>Start Time</Title>
      <TimePicker
        onChange={(value) => onChanges(value, "startTime")}
        value={newEvent.startTime}
      />
      <Title level={5}>End Time</Title>
      <TimePicker
        onChange={(value) => onChanges(value, "endTime")}
        value={newEvent.endTime}
      />
      <Title level={5}>Location</Title>
      <Input
        placeholder="Location"
        prefix={<EnvironmentOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
        name="location"
        value={newEvent.location}
        onChange={(e) => onChanges(e.target.value, "location")}
      />
    </>
  );
};

export default EditNewEventForm;
