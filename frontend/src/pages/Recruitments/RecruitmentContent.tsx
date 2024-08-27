import { useRecruitmentContext } from "./context";
import Table from "../../components/Table/Table";
import TableHeader from "../../components/Table/TableHeader";
import Drawer from "../../components/Shared/Drawer";
import Stepper from "./components/Stepper";
import { columns as generateColumns } from "./columns/columns";
import usePagination from "../../hooks/usePagination";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const RecruitmentContent: React.FC = () => {
  const { t } = useTranslation();
  const {
    tableData,
    drawerState,
    setDrawerState,
    setIsEditModalVisible,
    setEditingRecord,
    fetchApplicants,
  } = useRecruitmentContext();
  const {
    page,
    limit,
    handlePageChange,
    handleLimitChange,
    setItemCount,
    itemCount,
  } = usePagination();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchApplicants(page, limit);
      if (response) {
        setItemCount(response);
      }
    };
    fetchData();
  }, [page, limit]);

  const columns = generateColumns({
    tableData,
    setDrawerState,
    setEditingRecord,
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
          current: page,
          pageSize: limit,
          total: itemCount,
          onChange: handlePageChange,
          onShowSizeChange: handleLimitChange,
        }}
        fixed
      />
    </section>
  );
};
