import { Form, Input, DatePicker, Steps, Select, Row } from "antd";
import { useRecruitmentContext } from "../context";
import { evaluationSteps, RecruitmentStage } from "../columns/constants";
import { EmployeeDetails } from "../../../types/EmployeeDetailsProps";
import Title from "../../../components/Shared/Title";
import EmployeeTag from "../../../components/Shared/EmployeeTag";
import { fetchEmployee } from "../../../helpers/employee.helper";
import { useState, useCallback } from "react";
import tagRender from "../../../components/Shared/tagRenderer";
import { debounce } from "../../../helpers/debounce.helper";

const InterviewForm: React.FC<{ step: string }> = ({ step }) => {
  const { editingRecord } = useRecruitmentContext();
  const stage =
    step === RecruitmentStage.FirstInterview
      ? editingRecord.firstInterview
      : editingRecord.secondInterview;

  const [employeeOptions, setEmployeeOptions] = useState<EmployeeDetails[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<EmployeeDetails[]>(
    stage.interviewers || []
  );

  const handleSearch = useCallback(
    debounce(async (value: string) => {
      if (value) {
        const [name, surname] = value.split(" ");
        const data = await fetchEmployee(name, surname);
        if (data) {
          setEmployeeOptions(data);
        }
      }
    }, 300),
    []
  );

  const handleSelect = (value: string | undefined) => {
    if (value) {
      const selected = employeeOptions.find((emp) => emp.email === value);
      if (selected && !selectedEmployees.some((emp) => emp.email === value)) {
        setSelectedEmployees([...selectedEmployees, selected]);
      }
    }
  };
  const getEvaluationStepIndex = (evaluationValue: string) => {
    return evaluationSteps.findIndex((item) => item.value === evaluationValue);
  };

  return (
    <>
      <Title title={step} level={5} />
      <Form.Item label="Date" name={"date"}>
        <DatePicker />
      </Form.Item>
      <Form.Item label="Notes" name={"notes"}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="Interviewers" name={"interviewers"}>
        <Row style={{ paddingBottom: "5px", maxWidth: "40%" }}>
          {selectedEmployees.map((interviewer: EmployeeDetails) => (
            <EmployeeTag
              key={interviewer.email}
              label={`${interviewer.name} ${interviewer.surname}`}
              value={interviewer}
              closable
              onClose={() => {
                setSelectedEmployees((prev) =>
                  prev.filter((emp) => emp.email !== interviewer.email)
                );
              }}
              disabled={false}
              isMaxTag={false}
            />
          ))}
          <Select
            mode="multiple"
            tagRender={tagRender}
            style={{ width: "100%" }}
            options={employeeOptions.map((emp) => ({
              label: `${emp.name} ${emp.surname} - ${emp.position}`,
              value: emp.email,
            }))}
            onSearch={handleSearch}
            onSelect={handleSelect}
            value={selectedEmployees.map((emp) => emp.email)}
          />
        </Row>
      </Form.Item>
      <Form.Item label="Evaluation" name={"evaluation"}>
        <Steps
          direction="horizontal"
          responsive
          size="small"
          labelPlacement="vertical"
          current={getEvaluationStepIndex(
            editingRecord?.[step]?.evaluation || ""
          )}
        >
          {evaluationSteps.map((item, index) => (
            <Steps.Step
              key={index}
              title={item.title}
              icon={<span style={{ width: "10px" }}>{item.content}</span>}
            />
          ))}
        </Steps>
      </Form.Item>
    </>
  );
};

export default InterviewForm;
