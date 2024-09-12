import { useRecruitmentContext } from "./context";
import Table from "../../components/Table/Table";
import TableHeader from "../../components/Table/TableHeader";
import Drawer from "../../components/Shared/Drawer";
import Stepper from "./components/Stepper";
import { columns as generateColumns } from "./columns/columns";
import usePagination from "../../hooks/usePagination";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import React from "react";
import Filters from "./components/Filters";

export const RecruitmentContent: React.FC = () => {
  const { t } = useTranslation();
  const {
    tableData,
    drawerState,
    setDrawerState,
    setEditingRecord,
    fetchApplicants,
    filters,
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
      const response = await fetchApplicants(page, limit, filters);
      if (response) {
        setItemCount(response);
      }
    };
    fetchData();
  }, [page, limit, filters]);

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
        onClick={() => {
          setEditingRecord(null);
          setDrawerState(true);
        }}
      />
      <Filters />
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
