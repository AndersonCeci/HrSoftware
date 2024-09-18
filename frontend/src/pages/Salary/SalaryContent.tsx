import React, { useState, useRef, useEffect } from "react";
import { Button, Col, DatePicker, Input, Row, Space } from "antd";
import dayjs, { Dayjs } from "dayjs";
import Table from "../../components/Table/Table";
import AddBonusModal from "./components/AddBonusModal";
import EditSalaryModal from "./components/EditSalaryModal";
import columns from "./components/TableColumns";
import TableHeader from "../../components/Table/TableHeader";
import usePagination from "../../hooks/usePagination";
import { useSalaryHook } from "./context/hook";
import { Salary } from "../../types/SalaryProps";
import { useTranslation } from "react-i18next";

const { RangePicker } = DatePicker;
const { Search } = Input;

const SalaryContent: React.FC = () => {
  const { t } = useTranslation();

  const addBonusRef = useRef<Salary>(null);
  const editFormRef = useRef<Salary>(null);

  const startOfMonth = dayjs().startOf("month");
  const endOfMonth = dayjs().endOf("month");

  const [selectedRange, setSelectedRange] = useState<[Dayjs, Dayjs]>([
    startOfMonth,
    endOfMonth,
  ]);
  const [searchValue, setSearchValue] = useState<string>("");

  const {
    tableData,
    itemCount,
    handleModal,
    handleAddBonus,
    handleAddBonusSubmit,
    handleEditSubmit,
    setFilters,
    filters,
    createSalary,
    updateSalary,
  } = useSalaryHook();
  const { page, limit, handlePageChange, handleLimitChange } = usePagination();

  useEffect(() => {
    setFilters({
      ...filters,
      startDate: startOfMonth,
      endDate: endOfMonth,
    });
  }, []);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setFilters({ ...filters, name: value.trim() });
  };

  const handleRangeChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (dates) {
      const [start, end] = dates;
      setSelectedRange([start!, end!]);
      setFilters({
        ...filters,
        startDate: start!.startOf("month"),
        endDate: end!.endOf("month"),
      });
    }
  };

  const handleResetFilters = () => {
    setSelectedRange([startOfMonth, endOfMonth]);
    setSearchValue("");
    setFilters({
      startDate: startOfMonth,
      endDate: endOfMonth,
    });
  };

  return (
    <div style={{ margin: 20 }}>
      <TableHeader title={t("salaries")} onClick={handleModal} />
      <Row gutter={10} title="Filters">
        <Col>
          <Space direction="vertical" size={12}>
            <RangePicker
              picker="month"
              value={selectedRange}
              defaultValue={[startOfMonth, endOfMonth]}
              onCalendarChange={handleRangeChange}
              allowClear={false}
            />
          </Space>
        </Col>
        <Col>
          <Search
            placeholder={t("enterEmployeeName")}
            style={{ width: 300 }}
            onSearch={handleSearch}
            enterButton
            allowClear
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Col>
        <Col flex="auto" style={{ textAlign: "left" }}>
          <Button type="primary" onClick={handleResetFilters}>
            {t("resetFilters")}
          </Button>
        </Col>
        <Col flex="auto" style={{ textAlign: "left" }}>
          <Button type="primary" onClick={handleResetFilters}>
            {"Compensate All"}
          </Button>
        </Col>
      </Row>
      <Table
        data={tableData}
        columns={columns({
          handleAddBonus,
          handleModal,
          tableData,
          updateSalary,
        })}
        fixed
        pagination={{
          position: ["bottomRight"],
          current: page,
          pageSize: limit,
          total: itemCount,
          onChange: handlePageChange,
          onShowSizeChange: handleLimitChange,
        }}
      />

      <AddBonusModal
        addBonusRef={addBonusRef}
        handleAddBonusSubmit={handleAddBonusSubmit}
      />
      <EditSalaryModal
        editFormRef={editFormRef}
        handleEditSubmit={handleEditSubmit}
        handleCreateSubmit={createSalary}
      />
    </div>
  );
};

export default SalaryContent;
