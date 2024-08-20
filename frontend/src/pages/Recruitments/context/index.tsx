import React, { createContext, useContext } from "react";
import { useRecruitment } from "./hook";

const RecruitmentContext = createContext<any | null>(null);

export const RecruitmentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const recruitment = useRecruitment();

  return (
    <RecruitmentContext.Provider value={recruitment}>
      {children}
    </RecruitmentContext.Provider>
  );
};

export const useRecruitmentContext = () => {
  const context = useContext(RecruitmentContext);
  if (context === null) {
    throw new Error(
      "useRecruitmentContext must be used within a RecruitmentProvider"
    );
  }
  return context;
};
