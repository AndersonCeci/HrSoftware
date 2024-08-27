import {
  ProfileOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
  FrownOutlined,
  MehOutlined,
} from "@ant-design/icons";
import ApplicantForm from "../components/ApplicantForm";
import InterviewForm from "../components/InterviewForm";

const selectOption = [
  { label: "Applied", color: "cyan" },
  { label: "Rejected", color: "red" },
  { label: "1st Interview", color: "gold" },
  { label: "2nd Interview", color: "lime" },
  { label: "Offer Made", color: "blue" },
];

const references = [
  { value: "Linkedin", label: "LinkedIn" },
  { value: "Instagram", label: "Instagram" },
  { value: "Facebook", label: "Facebook" },
  { value: "Dua Pune", label: "Dua Pune" },
  { value: "Others", label: "Other" },
];

enum RecruitmentStage {
  Applied = "Applied",
  FirstInterview = "1st Interview",
  SecondInterview = "2nd Interview",
  OfferMade = "Offer Made",
}
export const customIcons: Record<number, React.ReactNode> = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

const evaluationSteps = [
  {
    title: "Negative",
    content: "😞",
    value: "Negative",
  },
  {
    title: "Not Sure",
    content: "😐",
  },
  {
    title: "OK",
    content: "👍",
  },
  {
    title: "Positive",
    content: "😊",
  },
];
const items = [
  {
    title: RecruitmentStage.Applied,
    icon: <UserOutlined />,
    content: <ApplicantForm />,
  },
  {
    title: RecruitmentStage.FirstInterview,
    icon: <SolutionOutlined />,
    content: <InterviewForm step={RecruitmentStage.FirstInterview} />,
  },
  {
    title: RecruitmentStage.SecondInterview,
    icon: <ProfileOutlined />,
    content: <InterviewForm step={RecruitmentStage.SecondInterview} />,
  },
  {
    title: RecruitmentStage.OfferMade,
    icon: <SmileOutlined />,
    content: <div>{RecruitmentStage.OfferMade}</div>,
  },
];

export { selectOption, references, RecruitmentStage, evaluationSteps, items };
