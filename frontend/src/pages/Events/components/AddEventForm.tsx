import { Form, Flex, Upload } from "antd";
import FormInputs from "../../../components/Shared/InputTypes/FormInputs";
import MapInput from "./MapInput";
import Button from "../../../components/Shared/Button";
import { ButtonSize, ButtonType } from "../../../enums/Button";
import { UploadOutlined } from "@ant-design/icons";
import { useRef, forwardRef, useImperativeHandle } from "react";
import { RcFile } from "antd/lib/upload/interface";

type AddEventFormProps = {
  onAdd: (event: any) => void;
};

const AddEventForm = forwardRef(({ onAdd }: AddEventFormProps, ref) => {
  const [form] = Form.useForm();
  const formRef = useRef<any>();

  useImperativeHandle(ref, () => ({
    submit: () => {
      formRef.current.submit();
    },
  }));

  function onFinish(values: any) {
    const valuesToSubmit = {
      ...values,
      eventDate: values.eventDate.format("YYYY-MM-DD"),
      eventEndDate: values.eventEndDate
        ? values.eventEndDate.format("YYYY-MM-DD")
        : values.eventDate.format("YYYY-MM-DD"),
      eventStartTime: values.eventStartTime.format("HH:mm"),
      eventEndTime: values.eventEndTime.format("HH:mm"),
      eventDiscription: values.eventDescription ? values.eventDescription : " ",
      location: "Location",
    };

    onAdd(valuesToSubmit);
  }

  const handleUpload = async (files: RcFile[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file as File);
    });

    try {
      const uploadResponse = await fetch("http://localhost:3000/files/upload", {
        method: "POST",
        body: formData,
      });
      const uploadData = await uploadResponse.json();
      const fileUrls = uploadData.fileUrls;

      form.setFieldsValue({ images: fileUrls });
    } catch (error) {
      console.error("File upload error:", error);
    }
  };

  const handleFileChange = (info: any) => {
    const files = info.fileList.map(
      (file: any) => file.originFileObj as RcFile
    );
    if (files.length > 0) {
      handleUpload(files);
    }
  };

  return (
    <Form
      onFinish={onFinish}
      layout="vertical"
      style={{ maxWidth: 600, margin: "40px auto" }}
      form={form}
      name="basic"
      ref={formRef}
      autoComplete="off"
    >
      <FormInputs.Input label="Event Name" name="eventName" required />
      <Flex gap={10}>
        <FormInputs.DatePicker
          label="Event Start"
          name="eventDate"
          required
          isDisabledDate
        />
        <FormInputs.DatePicker
          label="Event End"
          name="eventEndDate"
          isDisabledDate
          // disableFuture
          dependsOn="eventDate"
        />
      </Flex>

      <Flex gap={10}>
        <FormInputs.TimePicker
          label="Start Time"
          name="eventStartTime"
          required
        />
        <FormInputs.TimePicker
          label="End Time"
          name="eventEndTime"
          required
          dependsOn={"eventStartTime"}
        />
      </Flex>

      <MapInput />
      <FormInputs.Input
        label="Event Description"
        name="eventDescription"
        type="textarea"
      />

      <Form.Item label="Event Attachment" name="images">
        <Flex className="event-attachment-container">
          <Upload
            beforeUpload={() => {
              return false;
            }}
            listType="picture-card"
            multiple
            onChange={(info) => {
              const files = info.fileList.map((file) => file.originFileObj);
              if (files) {
                handleUpload(files);
              }
            }}
          >
            <Button icon={<UploadOutlined />} type="text" size="large">
              Upload
            </Button>
          </Upload>
        </Flex>
      </Form.Item>
    </Form>
  );
});

export default AddEventForm;
