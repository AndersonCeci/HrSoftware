import { useRecruitmentContext } from "./context";
import Table from "../../components/Table/Table";
import TableHeader from "../../components/Table/TableHeader";
import Drawer from "../../components/Shared/Drawer";
import Stepper from "./components/Stepper";
import { columns as generateColumns } from "./columns/columns";

const RecruitmentContent: React.FC = () => {
  const {
    t,
    tableData,
    drawerState,
    setDrawerState,
    setIsEditModalVisible,
    setEditingRecord,
    fetchApplicant,
  } = useRecruitmentContext();

  const columns = generateColumns({
    tableData,
    setDrawerState,
    setEditingRecord,
    fetchApplicant,
  });

  return (
    <section className="test">
      <Drawer
        placement="right"
        width={700}
        isOpen={drawerState}
        onClose={() => setDrawerState(false)}
        closeIcon={null}
      >
        <Stepper />
      </Drawer>
      <TableHeader
        title={t("recruitmentTitle")}
        onClick={() => setIsEditModalVisible(true)}
      />
      <Table
        columns={columns}
        data={tableData}
        pagination={{
          position: ["bottomRight"],
          // current: page,
          // pageSize: limit,
          // total: itemCount,
          // onChange: handlePageChange,
          // onShowSizeChange: handleLimitChange,
        }}
        fixed
      />
    </section>
  );
};

export default RecruitmentContent;
