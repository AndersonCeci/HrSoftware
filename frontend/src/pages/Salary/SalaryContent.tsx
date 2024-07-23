import Table from '../../components/Table/Table';
import AddBonusModal from './components/AddBonusModal';
import EditSalaryModal from './components/EditSalaryModal';
import columns from './components/TableColumns';
import { useRef } from 'react';
import { Salary } from '../../types/SalaryProps';
import { useSalaryHook } from './context/hook';


const SalaryContent = () => {
    const addBonusRef = useRef<Salary>();
    const editFormRef = useRef<Salary>();
  
    const {
        tableData,
        handleEdit,
        handleAddBonus,
        handleAddBonusSubmit,
        handleEditSubmit,
      } = useSalaryHook();
  return (
    <div style={{ margin: 20 }} >
    <h1>Salaries</h1>
    <Table
      data={tableData}
      columns={columns({ handleAddBonus, handleEdit })}
      fixed
    />
    <AddBonusModal
      addBonusRef={addBonusRef}
      handleAddBonusSubmit={handleAddBonusSubmit}
    />
    <EditSalaryModal
      editFormRef={editFormRef}
      handleEditSubmit={handleEditSubmit}
    />
  </div>
  )
}

export default SalaryContent