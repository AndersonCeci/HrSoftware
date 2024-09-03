import { ContractTypes } from "../pages/Recruitments/columns/constants";
import { Interview } from "./InterviewProps";

export type ApplicantProps = {
  _id: string;
  name: string;
  surname: string;
  email: string;
  position: string;
  firstInterview: Interview;
  secondInterview: Interview;
  offerMade: {
    offeredSalary: number;
    contractType: ContractTypes;
    startDate: Date;
  };
  applicationPhase: string;
  dateSubmitted: string;
  reference: string;
};
