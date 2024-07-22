import { useEffect, useState, useRef } from "react";
import { Salary } from "../../types/SalaryProps";
import axios from "axios";
import AddBonusModal from "./components/AddBonusModal";
import EditSalaryModal from "./components/EditSalaryModal";
import columns from "./components/TableColumns";
import Table from "../../components/Table/Table";

const SalariesPage: React.FC = () => {
  const addBonusRef = useRef<any>();
  const editFormRef = useRef<any>();
  const [tableData, setTableData] = useState<Salary[]>([]);
  const [isAddBonusModalOpen, setIsAddBonusModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSalary, setSelectedSalary] = useState<Salary | undefined>(
    undefined
  );

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/salary`);
      const data = response.data;
      setTableData(data);
    } catch (error) {
      console.log("No data found");
    }
  };

  const updateSalary = async (employeeID: string, newSalary: Salary) => {
    try {
      await axios.put(`http://localhost:3000/salary/${employeeID}`, newSalary);
      setTableData((prevData) =>
        prevData.map((salary) =>
          salary.employeeID === employeeID ? newSalary : salary
        )
      );
    } catch (error) {
      console.log("Cannot update salary");
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

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

  const handleAddBonusSubmit = (values: any) => {
    const bonuses = values.bonuses.map((bonus: any) => ({
      desc: bonus.desc,
      amount: parseInt(bonus.amount),
    }));

    if (!selectedSalary) return;

    const updatedSalary: Salary = {
      ...selectedSalary,
      bonuses: [...bonuses],
      total:
        selectedSalary.grossSalary +
        bonuses.reduce(
          (acc: any, bonus: { amount: any }) => acc + bonus.amount,
          0
        ),
    };

    updateSalary(selectedSalary.employeeID, updatedSalary);
    setIsAddBonusModalOpen(false);
    setSelectedSalary(undefined);
  };

  const handleEditSubmit = (values: any) => {
    const salary: Salary = {
      employeeID: values.employeeID,
      NSSH: values.NSSH,
      netSalary: values.netSalary,
      workDays: parseInt(values.workDays),
      bonuses: selectedSalary?.bonuses || [],
      socialSecurityContributions: parseInt(values.socialSecurityContributions),
      healthInsurance: parseInt(values.healthInsurance),
      grossSalary: parseInt(values.grossSalary),
      total: parseInt(values.total),
    };

    updateSalary(selectedSalary?.employeeID || "", salary);
    setIsEditModalOpen(false);
    setSelectedSalary(undefined);
  };

  return (
    <div style={{ margin: 20 }} className="test">
      <h1>Salaries</h1>
      <Table
        data={tableData}
        columns={columns({ handleAddBonus, handleEdit })}
        fixed
      />

      <AddBonusModal
        isAddBonusModalOpen={isAddBonusModalOpen}
        addBonusRef={addBonusRef}
        handleAddBonusSubmit={handleAddBonusSubmit}
        setIsAddBonusModalOpen={setIsAddBonusModalOpen}
        selectedSalary={selectedSalary}
      />

      <EditSalaryModal
        isEditModalOpen={isEditModalOpen}
        editFormRef={editFormRef}
        setIsEditModalOpen={setIsEditModalOpen}
        handleEditSubmit={handleEditSubmit}
        selectedSalary={selectedSalary}
      />
    </div>
  );
};

export default SalariesPage;
