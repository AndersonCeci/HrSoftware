import { useEffect, useContext, useState } from "react";
import axios, { AxiosError } from "axios";
import { Salary } from "../../../types/SalaryProps";
import { ModalContext, SalaryContext, TableContext } from ".";
import { Bonus } from "../../../types/BonusProps";
import { message } from "antd";
import dayjs, { Dayjs } from "dayjs";
const API = import.meta.env.REACT_APP_SALARY;

interface EditSalaryValues {
  _id: string;
  dateTaken: Date;
  employeeID: string;
  NSSH: string;
  netSalary: number;
  workDays: number;
  socialSecurityContributions: number;
  healthInsurance: number;
  grossSalary: number;
  total: number;
  paid: boolean;
  employeeDetails?: {
    name: string;
    surname: string;
  };
}

interface Filter {
  name?: string;
  startDate?: Dayjs;
  endDate?: Dayjs;
}

export const useSalaryHook = () => {
  const salaryContext = useContext(SalaryContext);
  const modalContext = useContext(ModalContext);
  const tableContext = useContext(TableContext);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [itemCount, setItemCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const startOfMonth = dayjs().startOf("month");
  const endOfMonth = dayjs().endOf("month");

  const [filters, setFilters] = useState<Filter>({
    startDate: startOfMonth,
    endDate: endOfMonth,
  });

  if (!salaryContext || !modalContext || !tableContext) {
    throw new Error("Contexts must be used within their respective providers");
  }

  const { selectedSalary, setSelectedSalary } = salaryContext;
  const { setIsAddBonusModalOpen, setIsEditModalOpen } = modalContext;
  const { tableData, setTableData } = tableContext;

  useEffect(() => {
    fetchSalaries(page, limit, filters);
  }, [page, limit, filters]);

  const fetchSalaries = async (
    page: number,
    limit: number,
    filters: Filter
  ) => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/salary", {
        params: { page, limit, ...filters },
      });
      const { data, meta } = response.data;
      setTableData(data);
      setItemCount(meta.itemCount);
    } catch (error) {
      console.error("No data found", error);
      message.error("Failed to fetch salaries.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleLimitChange = (pageSize: number) => {
    setLimit(pageSize);
    setPage(1);
  };

  const updateSalary = async (salaryID: string, newSalary: Salary) => {
    const sentSalary: Salary = {
      ...newSalary,
      dateTaken: new Date(newSalary.dateTaken),
    };
    try {
      const res = await axios.put(`${API}/${salaryID}`, sentSalary);
      setTableData((prevData) =>
        prevData.map((salary) =>
          salary._id === salaryID
            ? {
                employeeID: salary.employeeID,
                employeeDetails: salary.employeeDetails,
                ...res.data,
              }
            : salary
        )
      );
      message.success("Salary updated successfully.");
    } catch (error) {
      if (error instanceof AxiosError) {
        message.error(
          error.response?.data.errorDetails.message || error.message
        );
      } else {
        console.error("Cannot update salary", error);
        message.error("Failed to update salary.");
      }
    }
  };

  const getSelectedSalary = (salaryID: string) => {
    const salary = tableData.find((item) => item._id === salaryID);
    setSelectedSalary(salary);
  };

  const handleModal = (salaryID?: string) => {
    getSelectedSalary(salaryID!);
    setIsEditModalOpen(true);
  };

  const handleAddBonus = (salaryID: string) => {
    getSelectedSalary(salaryID);
    setIsAddBonusModalOpen(true);
  };

  const handleAddBonusSubmit = (values: { bonuses: Bonus[] }) => {
    if (!selectedSalary) return;

    const bonuse = values.bonuses.map((bonus) => ({
      desc: bonus.desc,
      amount: parseInt(bonus.amount.toString(), 10),
    }));
    const { bonuses, total, ...others } = selectedSalary;
    const updatedSalary: Salary = {
      ...others,
      bonuses: [...bonuse],
      total:
        selectedSalary.grossSalary +
        bonuse.reduce((acc, bonus) => acc + bonus.amount, 0),
    };

    updateSalary(selectedSalary._id, updatedSalary);
    setIsAddBonusModalOpen(false);
    setSelectedSalary(undefined);
  };

  const handleEditSubmit = (values: EditSalaryValues) => {
    if (!selectedSalary) return;
    const salary: Salary = {
      _id: values._id,
      employeeID: values.employeeID,
      NSSH: values.NSSH,
      dateTaken: values.dateTaken,
      netSalary: parseInt(values.netSalary.toString(), 10),
      workDays: parseInt(values.workDays.toString(), 10),
      bonuses: selectedSalary.bonuses,
      socialSecurityContributions: parseInt(
        values.socialSecurityContributions.toString(),
        10
      ),
      healthInsurance: parseInt(values.healthInsurance.toString(), 10),
      grossSalary: parseInt(values.grossSalary.toString(), 10),
      total: parseInt(values.total.toString(), 10),
      paid: values.paid,
    };

    updateSalary(selectedSalary._id, salary);
    setIsEditModalOpen(false);
    setSelectedSalary(undefined);
  };

  const createSalary = async (values: EditSalaryValues) => {
    try {
      const salary: Salary = {
        _id: values._id,
        employeeID: values.employeeID,
        NSSH: values.NSSH,
        dateTaken: new Date(values.dateTaken),
        netSalary: parseInt(values.netSalary.toString(), 10),
        workDays: parseInt(values.workDays.toString(), 10),
        socialSecurityContributions: parseInt(
          values.socialSecurityContributions.toString(),
          10
        ),
        healthInsurance: parseInt(values.healthInsurance.toString(), 10),
        grossSalary: parseInt(values.grossSalary.toString(), 10),
        total: parseInt(values.total.toString(), 10),
        paid: false,
      };

      await axios.post(API, salary);
      message.success("Salary inserted successfully");
    } catch (error) {
      if (error instanceof AxiosError) {
        message.error(
          error.response?.data.errorDetails.message || error.message
        );
      } else {
        message.error("Cannot insert the salary");
      }
    }
    setIsEditModalOpen(false);
  };

  return {
    setTableData,
    tableData,
    itemCount,
    page,
    limit,
    loading,
    handlePageChange,
    handleLimitChange,
    setSelectedSalary,
    handleModal,
    handleAddBonus,
    handleAddBonusSubmit,
    handleEditSubmit,
    setFilters,
    filters,
    createSalary,
  };
};
