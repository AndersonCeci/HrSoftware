import { useEffect, useContext } from "react";
import axios from "axios";
import { Salary } from "../../../types/SalaryProps";
import { ModalContext, SalaryContext, TableContext } from ".";
import { Bonus } from "../../../types/BonusProps";

interface EditSalaryValues {
  employeeID: string;
  NSSH: string;
  netSalary: number;
  workDays: number;
  socialSecurityContributions: number;
  healthInsurance: number;
  grossSalary: number;
  total: number;
}

export const useSalaryHook = () => {
  const salaryContext = useContext(SalaryContext);
  const modalContext = useContext(ModalContext);
  const tableContext = useContext(TableContext);

  if (!salaryContext) {
    throw new Error("useSalaryHandlers must be used within a SalaryProvider");
  }
  if (!modalContext) {
    throw new Error("useSalaryHandlers must be used within a BonusProvider");
  }
  if (!tableContext) {
    throw new Error("useSalaryHandlers must be used within a TableProvider");
  }

  const { selectedSalary, setSelectedSalary } = salaryContext;
  const { setIsAddBonusModalOpen, setIsEditModalOpen } = modalContext;
  const { tableData, setTableData } = tableContext;

  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/salary`);
        const data = response.data;
        setTableData(data);
      } catch (error) {
        console.log("No data found");
      }
    };
    fetchSalaries();
    console.log(tableData);
  }, []);

  const updateSalary = async (employeeID: string, newSalary: Salary) => {
    try {
      await axios.put(`http://localhost:3000/salary/${employeeID}`, newSalary);
      setTableData((prevData) =>
        prevData.map((salary) =>
          salary.employeeID === employeeID ? newSalary : salary
        )
      );
    } catch (error) {
      console.error("Cannot update salary", error);
    }
  };

  const getSelectedSalary = (employeeID: string) => {
    const salary = tableData.find((item) => item.employeeID === employeeID);
    setSelectedSalary(salary);
  };

  const handleEdit = (employeeID: string) => {
    getSelectedSalary(employeeID);
    setIsEditModalOpen(true);
  };

  const handleAddBonus = (employeeID: string) => {
    getSelectedSalary(employeeID);
    setIsAddBonusModalOpen(true);
  };

  const handleAddBonusSubmit = (values: { bonuses: Bonus[] }) => {
    if (!selectedSalary) return;

    const bonuses = values.bonuses.map((bonus) => ({
      desc: bonus.desc,
      amount: parseInt(bonus.amount.toString()),
    }));

    const updatedSalary: Salary = {
      ...selectedSalary,
      bonuses: [...bonuses],
      total:
        selectedSalary.grossSalary +
        bonuses.reduce((acc, bonus) => acc + bonus.amount, 0),
    };

    updateSalary(selectedSalary.employeeID, updatedSalary);
    setIsAddBonusModalOpen(false);
    setSelectedSalary(undefined);
  };

  const handleEditSubmit = (values: EditSalaryValues) => {
    if (!selectedSalary) return;

    const salary: Salary = {
      employeeID: values.employeeID,
      NSSH: values.NSSH,
      netSalary: parseInt(values.netSalary.toString()),
      workDays: parseInt(values.workDays.toString()),
      bonuses: selectedSalary.bonuses,
      socialSecurityContributions: parseInt(
        values.socialSecurityContributions.toString()
      ),
      healthInsurance: parseInt(values.healthInsurance.toString()),
      grossSalary: parseInt(values.grossSalary.toString()),
      total: parseInt(values.total.toString()),
    };

    updateSalary(selectedSalary.employeeID, salary);
    setIsEditModalOpen(false);
    setSelectedSalary(undefined);
  };

  return {
    tableData,
    setSelectedSalary,
    handleEdit,
    handleAddBonus,
    handleAddBonusSubmit,
    handleEditSubmit,
  };
};
