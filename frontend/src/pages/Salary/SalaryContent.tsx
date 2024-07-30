import Table from '../../components/Table/Table';
import AddBonusModal from './components/AddBonusModal';
import EditSalaryModal from './components/EditSalaryModal';
import columns from './components/TableColumns';
import { useRef } from 'react';
import { Salary } from '../../types/SalaryProps';
import { useSalaryHook } from './context/hook';
import { useTranslation } from 'react-i18next';


const SalaryContent = () =>
{
  const { t } = useTranslation();
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
    <div style={{ margin: 20 }}>
      <h1>{t("salariesTitle")}</h1>
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
  );
}

export default SalaryContent