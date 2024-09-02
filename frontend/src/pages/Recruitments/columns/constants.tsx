import {
  ProfileOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
  FrownOutlined,
  MehOutlined,
} from "@ant-design/icons";
import InterviewForm from "../components/form/InterviewForm";
import OfferMadeForm from "../components/form/OfferMadeForm";
import ApplicantForm from "../components/form/ApplicantForm";
import { useRecruitmentContext } from "../context";

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

const interviewTypes = [
  { value: "Phone Interview", label: "Phone Interview" },
  { value: "Video Interview", label: "Video Interview" },
  { value: "In-Person Interview", label: "In-Person Interview" },
  { value: "Panel Interview", label: "Panel Interview" },
  { value: "Technical Interview", label: "Technical Interview" },
  { value: "Informational Interview", label: "Informational Interview" },
];

enum ContractTypes {
  FullTime = "Full Time",
  PartTime = "Part Time",
  Temporary = "Temporary",
  Internship = "Internship",
  Seasonal = "Seasonal",
  FixedTerm = "Fixed Term",
  Indefinite = "Indefinite",
  Freelance = "Freelance",
  Remote = "Remote",
  Apprenticeship = "Apprenticeship",
}
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
    value: "Not sure",
  },
  {
    title: "OK",
    content: "👍",
    value: "OK",
  },
  {
    title: "Positive",
    content: "😊",
    value: "Positive",
  },
];

// const items = [
//   {
//     title: RecruitmentStage.Applied,
//     icon: <UserOutlined />,
//     content: <ApplicantForm />,
//   },
//   {
//     title: RecruitmentStage.FirstInterview,
//     icon: <SolutionOutlined />,
//     content: (
//       <InterviewForm
//         step={RecruitmentStage.FirstInterview}
//         onInterviewersChange={handleInterviewersChange}
//       />
//     ),
//   },
//   {
//     title: RecruitmentStage.SecondInterview,
//     icon: <ProfileOutlined />,
//     content: (
//       <InterviewForm
//         step={RecruitmentStage.SecondInterview}
//         onInterviewersChange={handleInterviewersChange}
//       />
//     ),
//   },
//   {
//     title: RecruitmentStage.OfferMade,
//     icon: <SmileOutlined />,
//     content: <OfferMadeForm />,
//   },
// ];

const menuItems = [
  {
    key: RecruitmentStage.Applied,
    label: RecruitmentStage.Applied,
  },
  {
    key: RecruitmentStage.FirstInterview,
    label: RecruitmentStage.FirstInterview,
  },
  {
    key: RecruitmentStage.SecondInterview,
    label: RecruitmentStage.SecondInterview,
  },
  {
    key: RecruitmentStage.OfferMade,
    label: RecruitmentStage.OfferMade,
  },
];
const referenceItems = [
  {
    key: "LinkedIn",
    label: "LinkedIn",
  },
  {
    key: "Instagram",
    label: "Instagram",
  },
  {
    key: "Facebook",
    label: "Facebook",
  },
  {
    key: "DuaPune",
    label: "Dua Pune",
  },
  {
    key: "Others",
    label: "Others",
  },
];

export {
  ContractTypes,
  selectOption,
  references,
  RecruitmentStage,
  evaluationSteps,
  menuItems,
  referenceItems,
  interviewTypes,
};
