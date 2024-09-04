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
} from "../../../../helpers/employee.helper";
import { useState, useCallback, useEffect } from "react";
import tagRender from "../tagRenderer";
import { debounce } from "../../../../helpers/debounce.helper";
import FormInputs from "../../../../components/Shared/InputTypes/FormInputs";
import { getFromLocalStorage } from "../../../../utils/utils";

const InterviewForm: React.FC<{
  step: string;
  onInterviewersChange: (interviewers: string[]) => void;
}> = ({ step, onInterviewersChange }) => {
  const { editingRecord } = useRecruitmentContext();
  const stage =
    step === RecruitmentStage.FirstInterview
      ? editingRecord.firstInterview
      : editingRecord.secondInterview;

  const [employeeOptions, setEmployeeOptions] = useState<EmployeeDetails[]>([]);
  const [selectedInterviewers, setSelectedInterviewers] = useState<
    EmployeeDetails[]
  >(stage.interviewers ?? []);
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const { employID } = getFromLocalStorage();
    if (employID) {
      fetchEmployeeByID(employID).then((user) => {
        if (user) {
          setEmployeeOptions((prevOptions) => {
            if (!prevOptions.some((emp) => emp._id === user._id)) {
              return [...prevOptions, user];
            }
            return prevOptions;
          });
        }
      });
    }
    const interviewerIds: string[] = selectedInterviewers
      .map((emp: any) => emp._id)
      .filter((id): id is string => id !== undefined);

    onInterviewersChange(interviewerIds);
  }, [selectedInterviewers, onInterviewersChange]);

  useEffect(() => {
    setSelectedInterviewers(stage.interviewers || []);
    setCurrent(parseInt(stage.evaluation || "0", 10));
  }, [stage, step]);

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
      const selected = employeeOptions.find(
        (emp) => `${emp.name} ${emp.surname}` === value
      );
      if (
        selected &&
        !selectedInterviewers.some((emp) => emp.email === selected.email)
      ) {
        setSelectedInterviewers([...selectedInterviewers, selected]);
      }
    }
  };

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <FormInputs.DatePicker
            label="Date"
            name={"date"}
            showTime
            format="YYYY-MM-DD HH:mm"
            placeholder="Select date and time"
          />
        </Col>
        <Col span={12}>
          <FormInputs.Select
            name="type"
            label="Interview Type"
            options={interviewTypes}
          />
        </Col>
      </Row>

      <Form.Item label="Interviewers" name={"interviewers"}>
        <Row style={{ paddingBottom: "5px", width: "100%" }}>
          <Select
            mode="multiple"
            placeholder="Select interviewers"
            tagRender={tagRender}
            style={{ width: "100%", height: "40px" }}
            options={employeeOptions.map((item) => ({
              value: `${item.name} ${item.surname}`,
              label: `${item.name} ${item.surname}`,
            }))}
            onSearch={handleSearch}
            onSelect={handleSelect}
            value={selectedInterviewers.map(
              (emp) => `${emp.name} ${emp.surname}`
            )}
          />
        </Row>
      </Form.Item>

      <Form.Item label="Notes" name={"notes"}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="Evaluation" name={"evaluation"}>
        <Row>
          <Steps
            direction="horizontal"
            onChange={(current) => {
              setCurrent(current);
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
