import { Form } from "antd";
import FormInputs from "../../../components/Shared/InputTypes/FormInputs";
import { EmployeeDataType } from "../types/Employee";
import exporter, { getDevRoles } from "../utils/helperFunctions";
import { useTranslation } from "react-i18next";
import { useRef, useImperativeHandle, forwardRef } from "react";
import { AddEmployeeFormProps } from "../types/EmployeeFormTypes";
import dayjs from "dayjs";

// const API = import.meta.env.REACT_APP_EMPLOYEE_API;

const PromoteForm = forwardRef(
  ({ selectedEmployee, onEdit }: AddEmployeeFormProps, ref) => {
    const [form] = Form.useForm<EmployeeDataType>();
    const formRef = useRef();
    const initialValues = exporter.getInitialFormValues(selectedEmployee);
    const position = getDevRoles().map((role) => ({
      label: role,
      value: role,
    }));
    const { t } = useTranslation();

    useImperativeHandle(ref, () => ({
      submit: () => {
        formRef.current.submit();

      },
    }));

    const onFinish = (values: any) => {
      console.log(values)
      const valuesToSubmit = {
        newPosition:  values.position,
        newSalary: values.salary,
        trainedBy: values.trainedBy,
        dateOfPromotion: dayjs(values.dateOfPromotion).format("DD/MM/YYYY")
      }
      onEdit(valuesToSubmit)
    };



    return (
      <div>
        <Form
          layout="vertical"
          form={form}
          ref={formRef}
          onFinish={onFinish}
          initialValues={initialValues}
        >
          <FormInputs.Select
            label={t("position")}
            name="position"
            options={position}
          />
          <FormInputs.Input 
            label="Salary"
            name="salary"
            defaultValidateRule="number"
            required
          />
          <FormInputs.DatePicker
            label={t("promotedOn")}
            name="dateOfPromotion"
            required
            isDisabledDate
          />
          <FormInputs.Input label={t("Trained By")} name="trainedBy" required />
        </Form>
      </div>
    );
  }
);

export default PromoteForm;


