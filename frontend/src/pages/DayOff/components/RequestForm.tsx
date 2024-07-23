import { DatePicker, Form, Layout, Select } from "antd";
import Button from "../../../components/Shared/Button";

import { Content } from "antd/es/layout/layout";
import dayjs from "dayjs";
import { GetProps } from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import TextArea from "antd/es/input/TextArea";
import { ButtonType } from "../../../enums/Button";

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

dayjs.extend(customParseFormat);
const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  return current && current < dayjs().startOf("day");
};

const RequestForm = () => {
  const type = [
    { label: "Annual Leave", value: "annual" },
    { label: "Sick Leave", value: "sick" },
  ];
  return (
    <Layout style={{ width: "100%", background: "#fff" }}>
      <Content>
        <Form layout="vertical">
          <h2>Leave Request Form</h2>
          <Form.Item
            label="Leave From"
            name="leaveFrom"
            rules={[{ required: true }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              format={"MM/DD/YYYY"}
              disabledDate={disabledDate}
            />
          </Form.Item>
          <Form.Item
            label="Leave To"
            name="leaveTo"
            rules={[{ required: true }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              format={"MM/DD/YYYY"}
              disabledDate={disabledDate}
            />
          </Form.Item>
          <Form.Item
              label="Leave Type"
              name="leaveType"
              rules={[{ required: true }]}
            >
              <Select
                style={{ width: "100%" }}
                options={type}
                placeholder="Choose a leave type"
              ></Select>
            </Form.Item>
            <Form.Item 
            label="Reason"
            name="reason"
            >
                <TextArea  rows={4} />
            </Form.Item>
            <Button type={ButtonType.PRIMARY}>Apply</Button>
        </Form>
      </Content>
    </Layout>
  );
};

export default RequestForm;
