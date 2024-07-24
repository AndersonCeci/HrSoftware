import Steps from "../../../components/Shared/Steps";
import DrowerButton from "./DrowerButton";
import getStepItems from "./StepItem";
import dayjs from "dayjs";
import { Form, Layout } from "antd";
import useHttp from "../../../hooks/useHttp";
import { useState } from "react";
import exporter from "../utils/helperFunctions";
import { AddEmployeeFormProps } from "../types/EmployeeFormTypes";
import { EmployeeDataType } from "../types/Employee";

const { Content, Sider } = Layout;
const devRoles = exporter.getDevRoles();

const AddEmployeeForm = ({
  selectedEmployee,
  onAdd,
  onEdit,
}: AddEmployeeFormProps) => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm<EmployeeDataType>();
  const [isLoading, error, sendRequest] = useHttp();
  const initialValues = exporter.getInitialFormValues(selectedEmployee);
  const [valuesToSubmit, setValuesToSubmit] = useState(initialValues);

  function handleStepChanges(changer: number) {
    if (changer > 0) {
      form.validateFields().then(() => {
        setCurrent((prev) => prev + changer);
      });
    } else {
      setCurrent((prev) => prev + changer);
    }
  }

  function handleFinish() {
    if (exporter.validate(valuesToSubmit.salary)) {
      setValuesToSubmit((prev) => ({ ...prev, salary: 1 }));
      return;
    }

    setCurrent((prev) => prev + 1);

    const data = {
      ...valuesToSubmit,
      username: valuesToSubmit.name + valuesToSubmit.surname,
      password: "codevider",
      phoneNumber: parseInt(valuesToSubmit.phoneNumber.toString()),
      salary: parseInt(valuesToSubmit.salary.toString()),
      // status: "Working",
      startingDate: dayjs(valuesToSubmit.startingDate).format("D/M/YYYY"),
      contract: "Permanent",
      isDeleted: false,
    };

    const userRole = devRoles.includes(data.position)
      ? "dev"
      : valuesToSubmit.position.toLowerCase();

    console.log(data);

    if (selectedEmployee) {
      sendRequest(
        exporter.submitHelper(
          `employees/${selectedEmployee._id}`,
          data,
          "PATCH"
        ),
        (responseData: any) => {
          onEdit(responseData);
        }
      );
    } else {
      sendRequest(
        exporter.submitHelper("employees", data),
        (responseData: any) => {
          onAdd(responseData);
        }
      );
      sendRequest(
        exporter.submitHelper("users", {
          username: data.username,
          password: data.password,
          role: userRole,
        }),
        (responseData: any) => {
          console.log(responseData, "response data");
        }
      );
    }
  }

  function handleInputChange(value: any, identifier: string) {
    form.setFieldsValue({ [identifier]: value });
    setValuesToSubmit((prev) => ({ ...prev, [identifier]: value }));
  }

  const item = getStepItems(current, handleInputChange, form, isLoading, error);

  return (
    <Layout style={{ height: "100%", background: "#fff" }}>
      <Content>
        <Form
          layout="vertical"
          form={form}
          name="basic"
          initialValues={initialValues}
        >
          <div>{item[current].content}</div>
          <DrowerButton
            current={current}
            item={item}
            onChange={handleStepChanges}
            onFinish={handleFinish}
          />
        </Form>
      </Content>
      <Sider theme={"light"}>
        <Steps direction="vertical" current={current} items={item} />
      </Sider>
    </Layout>
  );
};

export default AddEmployeeForm;
