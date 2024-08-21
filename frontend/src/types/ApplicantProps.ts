import { Interview } from "./InterviewProps";

export type ApplicantProps = {
  _id: string;
  name: string;
  surname: string;
  email: string;
  position: string;
  firstInterview: Interview;
  secondInterview: Interview;
  applicationPhase: string;
  dateSubmitted: string;
  reference: string;
};
