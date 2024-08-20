import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import Steps from "../../../components/Shared/Steps";
import { RecruitmentStage } from "../columns/constants";
import SolutionOutlined from "@ant-design/icons/lib/icons/SolutionOutlined";
import SmileOutlined from "@ant-design/icons/lib/icons/SmileOutlined";
import ProfileOutlined from "@ant-design/icons/lib/icons/ProfileOutlined";
import { useState } from "react";
import ApplicantForm from "./ApplicantForm";
import InterviewForm from "./InterviewForm";

const items = [
  {
    title: RecruitmentStage.Applied,
    status: "finish",
    icon: <UserOutlined />,
    content: RecruitmentStage.Applied,
  },
  {
    title: RecruitmentStage.FirstInterview,
    status: "finish",
    icon: <SolutionOutlined />,
    content: RecruitmentStage.FirstInterview,
  },
  {
    title: RecruitmentStage.SecondInterview,
    icon: <ProfileOutlined />,
    content: RecruitmentStage.SecondInterview,
  },
  {
    title: RecruitmentStage.OfferMade,
    status: "wait",
    icon: <SmileOutlined />,
    content: RecruitmentStage.OfferMade,
  },
];

const Stepper = () => {
  const [current, setCurrent] = useState(0);
  const onChange = (value: number) => {
    console.log("onChange:", value);
    setCurrent(value);
  };

  return (
    <div style={{ paddingTop: 16 }}>
      <Steps
        onChange={onChange}
        current={current}
        direction="horizontal"
        responsive
        items={items}
      />
      <div>
        {current === 0 && <ApplicantForm />}
        {current === 1 && (
          <InterviewForm step={RecruitmentStage.FirstInterview} />
        )}
        {current === 2 && (
          <InterviewForm step={RecruitmentStage.SecondInterview} />
        )}
        {current === 3 && <div>{RecruitmentStage.OfferMade}</div>}
      </div>
    </div>
  );
};

export default Stepper;
