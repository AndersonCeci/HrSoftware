import { RecruitmentProvider } from "./context";
import { RecruitmentContent } from "./RecruitmentContent";

const RecruitmentPage: React.FC = () => {
  return (
    <RecruitmentProvider>
      <RecruitmentContent />
    </RecruitmentProvider>
  );
};

export default RecruitmentPage;
