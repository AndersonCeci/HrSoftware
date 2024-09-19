import { Form, Input, Flex, Typography } from "antd";

import FormInputs from "../../../components/Shared/InputTypes/FormInputs";
import { getDevRoles } from "../../Employment/utils/helperFunctions";
import { useRef, forwardRef, useImperativeHandle, useState } from "react";
import { references, selectOption } from "../columns/constants";
import dayjs from "dayjs";
import useHttp from "../../../hooks/useHttp";
import { ApplicantProps } from "../../../types/ApplicantProps";
const main_api = import.meta.env.REACT_APP_MAIN;

const options = selectOption.map((option) => ({
  value: option.label,
  label: option.label,
}));

type EditModalProps = {
  // onSubmit: (values: RecrutmentDataType) => void;
  selectedRecord: ApplicantProps | null;
  onAdd: (newData: ApplicantProps) => void;
  onEdit: (newData: ApplicantProps) => void;
};

const API = import.meta.env.REACT_APP_RECRUITMENT_API;
const positions = getDevRoles().map((role) => ({ value: role, label: role }));

const TableModal = forwardRef(
  ({ selectedRecord, onAdd, onEdit }: EditModalProps, ref) => {
    const [form] = Form.useForm();
    const formRef = useRef<any>(null);
    const initialValues = selectedRecord
      ? {
          ...selectedRecord,
          submittedDate: dayjs(selectedRecord.dateSubmitted),
        }
      : undefined;
    const [isLoading, error, sendRequest] = useHttp();
    const [file, setFile] = useState<File | null>(null);

    useImperativeHandle(ref, () => ({
      submit: () => {
        formRef.current.submit();
      },
    }));

    const handleUpload = async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const uploadResponse = await fetch(`${main_api}/files/upload`, {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error("File upload failed");
        }

        const uploadData = await uploadResponse.json();
        const fileUrl = uploadData.fileUrl;

        form.setFieldsValue({ cv: fileUrl });
        setFile(file);
      } catch (error) {
        console.error("File upload error:", error);
      }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleUpload(file);
      } else {
        console.log("no selected file");
      }
    };

    function handleSubmit(values: any) {
      const valuesToSend = {
        ...values,
        submittedDate: values.submittedDate
          ? new Date(values.submittedDate)
          : dayjs(),
      };

      const path = selectedRecord ? `${API}/${selectedRecord._id}` : API;

      sendRequest(
        useHttp[selectedRecord ? "patchRequestHelper" : "postRequestHelper"](
          path,
          valuesToSend
        ),
        (responseData: any) => {
          selectedRecord ? onEdit(responseData) : onAdd(responseData);
        }
      );
    }

    return (
      <Form
        ref={formRef}
        form={form}
        initialValues={initialValues}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Flex gap={45}>
          <Flex vertical style={{ width: "100%" }}>
            <FormInputs.Input name="name" label="Name" required />
            <FormInputs.Input
              name="email"
              label="Email"
              required
              defaultValidateRule="email"
            />
            <FormInputs.Select
              name="stage"
              label="Stage"
              options={options}
              required
            />
            <FormInputs.Select
              name="reference"
              label="Reference"
              options={references}
              required
            />
          </Flex>
          <Flex vertical style={{ width: "100%" }}>
            <FormInputs.Input name="surname" label="Surname" required />
            <Form.Item label="CV" name="cv" valuePropName="cv">
              <Input
                type="file"
                name="cv"
                size="large"
                onChange={handleFileChange}
              />
            </Form.Item>
            <FormInputs.Select
              name="position"
              label="Position"
              options={positions}
              required
            />
            <FormInputs.DatePicker
              name="submittedDate"
              label="Date Submitted"
              isDisabledDate
            />
          </Flex>
        </Flex>
        {error && (
          <Typography.Text type="danger">
            {"Upsies. Somethings is wrong"}
          </Typography.Text>
        )}
      </Form>
    );
  }
);

export default TableModal;
