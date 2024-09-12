import { useState, useEffect } from "react";
import { Button, Col, Row, Form, Drawer } from "antd";
import { useForm } from "antd/es/form/Form";
import Steps from "../../../components/Shared/Steps";
import { findStepIndex, RecruitmentStage } from "../columns/constants";
import { useRecruitmentContext } from "../context";
import moment from "moment";
import ProfileCard from "./ProfileCard";
import ApplicantForm from "./form/ApplicantForm";
import { Typography } from "antd";
import {
  UserOutlined,
  SolutionOutlined,
  ProfileOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import InterviewForm from "./form/InterviewForm";
import OfferMadeForm from "./form/OfferMadeForm";
import EmailContent from "./EmailContent";
import AddEmployeeForm from "../../Employment/components/AddEmployeeForm";
const { Title } = Typography;

const Stepper = () => {
  const [form] = useForm();

  const { editingRecord, updateApplicant, createApplicant } =
    useRecruitmentContext();
  const [current, setCurrent] = useState(findStepIndex(editingRecord.stage));
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const [employmentDrawer, setEmploymentDrawer] = useState(false);

  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };

  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };

  const stage =
    current === 1
      ? editingRecord.firstInterview
      : current === 2
      ? editingRecord.secondInterview
      : null;

  const onChange = (value: number) => {
    setCurrent(value);
  };
  const [interviewers, setInterviewers] = useState<string[]>([]);

  useEffect(() => {
    if (editingRecord) {
      form.setFieldsValue({
        name: editingRecord.name,
        surname: editingRecord.surname,
        email: editingRecord.email,
        position: editingRecord.position,
        reference: editingRecord.reference,
        submittedDate: editingRecord.submittedDate
          ? moment(editingRecord.submittedDate)
          : undefined,
      });

      if (stage) {
        form.setFieldsValue({
          ...stage,
          interviewers: stage.interviewers,
          date: stage.date ? moment(stage.date) : null,
        });
      }
      if (editingRecord.offerMade) {
        form.setFieldsValue({
          offeredSalary: editingRecord.offerMade.offeredSalary,
          contractType: editingRecord.offerMade.contractType,
          startDate: moment(editingRecord.offerMade.startDate),
        });
      }
    }
  }, [current, editingRecord, form]);
  const isHired = editingRecord?.stage === RecruitmentStage.Hired;
  const items = [
    {
      title: RecruitmentStage.Applied,
      icon: <UserOutlined />,
      content: <ApplicantForm />,
    },
    {
      title: RecruitmentStage.FirstInterview,
      icon: <SolutionOutlined />,
      content: (
        <InterviewForm
          step={RecruitmentStage.FirstInterview}
          onInterviewersChange={setInterviewers}
        />
      ),
    },
    {
      title: RecruitmentStage.SecondInterview,
      icon: <ProfileOutlined />,
      content: (
        <InterviewForm
          step={RecruitmentStage.SecondInterview}
          onInterviewersChange={setInterviewers}
        />
      ),
    },
    {
      title: RecruitmentStage.OfferMade,
      icon: <SmileOutlined />,
      content: <OfferMadeForm />,
    },
  ];
  return (
    <>
      {editingRecord && (
        <>
          <ProfileCard />
          <div style={{ padding: "16px 1px" }}>
            <Steps
              onChange={onChange}
              current={current}
              direction="horizontal"
              responsive
              items={items.map(({ title, icon }) => ({
                title,
                icon,
              }))}
            />
          </div>
        </>
      )}
      <div>
        <Form form={form} layout="vertical" disabled={isHired}>
          {editingRecord && (
            <div style={{ justifyItems: "inherit" }}>
              {items[current].content}
            </div>
          )}

          <Form.Item>
            {!editingRecord && (
              <>
                <Title level={4}>Add Applicant</Title>
                <ApplicantForm />
              </>
            )}
            <Row
              justify="end"
              style={{
                alignItems: "end",
                maxWidth: "100%",
                gap: "10",
              }}
            ></Row>
          </Form.Item>

          <Row gutter={6} style={{ marginTop: 16 }}>
            <Col>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => {
                    form.setFieldValue("interviewers", interviewers);
                    editingRecord
                      ? updateApplicant(
                          editingRecord._id,
                          form.getFieldsValue(),
                          current
                        )
                      : createApplicant(form.getFieldsValue());
                  }}
                >
                  Save
                </Button>
              </Form.Item>
            </Col>
            {editingRecord && (
              <>
                <Col>
                  <Form.Item>
                    <Button type="default" onClick={showChildrenDrawer}>
                      Notify
                    </Button>
                  </Form.Item>
                  <Drawer
                    title={`Notify ${editingRecord.name} ${editingRecord.surname}`}
                    width={"30%"}
                    closable={true}
                    onClose={onChildrenDrawerClose}
                    open={childrenDrawer}
                  >
                    <EmailContent onCancel={onChildrenDrawerClose} />
                  </Drawer>
                </Col>
                <Col flex="auto">
                  <Row justify="end" style={{ width: "100%" }} gutter={8}>
                    <Col>
                      <Button
                        type="primary"
                        danger
                        onClick={() => {
                          updateApplicant(
                            editingRecord._id,
                            { rejected: true },
                            0
                          );
                        }}
                      >
                        Reject
                      </Button>
                    </Col>
                    {current === 3 && (
                      <Col>
                        <Button
                          type="primary"
                          onClick={() => setEmploymentDrawer(true)}
                        >
                          Hire
                        </Button>
                        <Drawer
                          width="100%"
                          onClose={() => setEmploymentDrawer(false)}
                          open={employmentDrawer}
                        >
                          <AddEmployeeForm
                            applicant={true}
                            selectedEmployee={editingRecord}
                            onAdd={() => {}}
                            onEdit={() => {}}
                          />
                        </Drawer>
                      </Col>
                    )}
                  </Row>
                </Col>
              </>
            )}
          </Row>
        </Form>
      </div>
    </>
  );
};

export default Stepper;
