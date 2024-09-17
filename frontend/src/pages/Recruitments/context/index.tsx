import React, { createContext, useContext } from "react";
import { useRecruitment } from "./hooks/hook";
import useFilters from "./hooks/filter.hook";
import { useForm } from "antd/es/form/Form";

const RecruitmentContext = createContext<any | null>(null);

export const RecruitmentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [form] = useForm();
  const recruitment = useRecruitment();
  const filters = useFilters();

  return (
    <RecruitmentContext.Provider value={{ ...recruitment, ...filters, form }}>
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
