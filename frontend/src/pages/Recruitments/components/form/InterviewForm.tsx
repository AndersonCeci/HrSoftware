import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Form, Input, Steps, Row, Select, Col } from "antd";
import { useRecruitmentContext } from "../../context";
import {
  evaluationSteps,
  interviewTypes,
  RecruitmentStage,
} from "../../columns/constants";
import { EmployeeDetails } from "../../../../types/EmployeeDetailsProps";
import {
  fetchEmployee,
  fetchEmployeeByID,
  fetchEmployees,
} from "../../../../helpers/employee.helper";
import tagRender from "../tagRenderer";
import { debounce } from "../../../../helpers/debounce.helper";
import FormInputs from "../../../../components/Shared/InputTypes/FormInputs";
import { getFromLocalStorage } from "../../../../utils/utils";

const InterviewForm: React.FC<{
  step: string;
  onInterviewersChange: (interviewers: string[]) => void;
}> = ({ step, onInterviewersChange }) => {
  const { editingRecord, form } = useRecruitmentContext();
  const stage = useMemo(
    () =>
      step === RecruitmentStage.FirstInterview
        ? editingRecord.firstInterview
        : editingRecord.secondInterview,
    [step, editingRecord]
  );

  const [employeeOptions, setEmployeeOptions] = useState<EmployeeDetails[]>([]);
  const [selectedInterviewers, setSelectedInterviewers] = useState<string[]>(
    []
  );
  const [current, setCurrent] = useState<number>(0);

  const fetchInterviewers = useCallback(async () => {
    if (stage?.interviewers && stage.interviewers.length > 0) {
      const data = await fetchEmployees(stage.interviewers);
      setSelectedInterviewers(stage.interviewers);
      setEmployeeOptions((prevOptions) => {
        const newOptions = [...prevOptions];
        data.forEach((emp: EmployeeDetails) => {
          if (!newOptions.some((option) => option._id === emp._id)) {
            newOptions.push(emp);
          }
        });
        return newOptions;
      });
      form.setFieldsValue({
        interviewers: data.map((emp: EmployeeDetails) => ({
          label: `${emp.name} ${emp.surname}`,
          value: emp._id,
        })),
      });
    }
  }, [stage, form]);

  const fetchCurrentUser = useCallback(async () => {
    const { employID } = getFromLocalStorage();
    if (employID) {
      const user = await fetchEmployeeByID(employID);
      if (user) {
        setEmployeeOptions((prevOptions) => {
          if (!prevOptions.some((emp) => emp._id === user._id)) {
            return [...prevOptions, user];
          }
          return prevOptions;
        });
      }
    }
  }, []);

  useEffect(() => {
    fetchInterviewers();
    fetchCurrentUser();
    setCurrent(parseInt(stage?.evaluation || "0", 10));
  }, [fetchInterviewers, fetchCurrentUser, stage]);

  useEffect(() => {
    onInterviewersChange(selectedInterviewers);
  }, [selectedInterviewers, onInterviewersChange]);

  // const handleSearch = useCallback(
  //   debounce(async (value: string) => {
  //     if (value) {
  //       const [name, surname] = value.split(" ");
  //       const data = await fetchEmployee(name, surname);
  //       if (data) {
  //         setEmployeeOptions((prevOptions) => {
  //           const newOptions = [...prevOptions];
  //           data.forEach((emp) => {
  //             if (!newOptions.some((option) => option._id === emp._id)) {
  //               newOptions.push(emp);
  //             }
  //           });
  //           return newOptions;
  //         });
  //       }
  //     }
  //   }, 300),
  //   []
  // );

  // const handleSelect = useCallback(
  //   (value: string) => {
  //     const selected = employeeOptions.find(
  //       (emp) => `${emp.name} ${emp.surname}` === value
  //     );
  //     if (selected && !selectedInterviewers.includes(selected?._id)) {
  //       const updatedInterviewers = [...selectedInterviewers, selected._id];
  //       setSelectedInterviewers(updatedInterviewers);
  //       updateFormInterviewers(updatedInterviewers);
  //     }
  //   },
  //   [employeeOptions, selectedInterviewers, form]
  // );

  const handleDeselect = useCallback(
    (value: string) => {
      const deselectedEmployee = employeeOptions.find(
        (emp) => `${emp.name} ${emp.surname}` === value
      );
      if (deselectedEmployee) {
        const updatedInterviewers = selectedInterviewers.filter(
          (id) => id !== deselectedEmployee._id
        );
        setSelectedInterviewers(updatedInterviewers);
        updateFormInterviewers(updatedInterviewers);
      }
    },
    [selectedInterviewers, employeeOptions, form]
  );

  const updateFormInterviewers = useCallback(
    (interviewerIds: string[]) => {
      const interviewers = interviewerIds
        .map((id) => {
          const emp = employeeOptions.find((e) => e._id === id);
          return emp
            ? {
                label: `${emp.name} ${emp.surname}`,
                value: emp._id,
              }
            : null;
        })
        .filter(Boolean);

      form.setFieldsValue({ interviewers });
    },
    [form, employeeOptions]
  );

  const disabledDateTime = useCallback(
    () => ({
      disabledHours: () =>
        Array.from({ length: 24 }, (_, i) => i).filter(
          (hour) => hour < 8 || hour > 18
        ),
      disabledMinutes: () => [],
      disabledSeconds: () => [],
    }),
    []
  );

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <FormInputs.DatePicker
            label="Date"
            name="date"
            showTime
            format="YYYY-MM-DD HH:mm"
            placeholder="Select date and time"
            required
            disabledTime={disabledDateTime}
          />
        </Col>
        <Col span={12}>
          <FormInputs.Select
            name="type"
            label="Interview Type"
            options={interviewTypes}
            required
          />
        </Col>
      </Row>

      <Form.Item
        label="Interviewers"
        name="interviewers"
        rules={[
          { required: true, message: "Interviewers should not be empty" },
        ]}
      >
        <Select
          mode="multiple"
          placeholder="Type to search interviewers"
          tagRender={tagRender}
          style={{ width: "100%" }}
          // onSearch={handleSearch}
          // onSelect={handleSelect}
          onDeselect={handleDeselect}
          labelInValue
          options={employeeOptions.map((item) => ({
            value: `${item.name} ${item.surname}`,
            label: `${item.name} ${item.surname}`,
          }))}
        />
      </Form.Item>

      <Form.Item label="Notes" name="notes">
        <Input.TextArea />
      </Form.Item>

      <Form.Item label="Evaluation" name="evaluation">
        <Row>
          <Steps
            direction="horizontal"
            onChange={(value) => {
              setCurrent(value);
              form.setFieldValue("evaluation", value);
            }}
            responsive
            size="small"
            labelPlacement="vertical"
            current={current}
          >
            {evaluationSteps.map((item, index) => (
              <Steps.Step
                key={index}
                title={item.title}
                icon={<span style={{ width: "10px" }}>{item.content}</span>}
              />
            ))}
          </Steps>
        </Row>
      </Form.Item>
    </>
  );
};

export default InterviewForm;
