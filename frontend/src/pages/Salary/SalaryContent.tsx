import Table from "../../components/Table/Table";
import AddBonusModal from "./components/AddBonusModal";
import EditSalaryModal from "./components/EditSalaryModal";
import columns from "./components/TableColumns";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useSalaryHook } from "./context/hook";
import { Salary } from "../../types/SalaryProps";
import { Button, Col, DatePicker, Input, Row, Space } from "antd";
import dayjs, { Dayjs } from "dayjs";
import TableHeader from "../../components/Table/TableHeader";

const { RangePicker } = DatePicker;
const { Search } = Input;

const SalaryContent = () => {
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
    page,
    limit,
    handlePageChange,
    handleLimitChange,
    handleModal,
    handleAddBonus,
    handleAddBonusSubmit,
    handleEditSubmit,
    setFilters,
    filters,
    createSalary,
  } = useSalaryHook();

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
      <TableHeader title={"Salaries"} onClick={handleModal}></TableHeader>
      {t("salariesTitle")}
      <Row title="Filters" gutter={16} align="middle">
        <Col>
          <Space direction="vertical" size={12}>
            <RangePicker
              picker="month"
              onChange={handleRangeChange}
              value={selectedRange}
              defaultValue={[startOfMonth, endOfMonth]}
            />
          </Space>
        </Col>
        <Col>
          <Search
            placeholder="Enter employee name"
            style={{ width: 300 }}
            onSearch={handleSearch}
            enterButton
            allowClear
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          
          />
        </Col>
        <Col flex="auto" style={{ textAlign: "right" }}>
          <Button type="primary" onClick={handleResetFilters}>
            Reset filters
          </Button>
        </Col>
      </Row>
      <Table
        data={tableData}
        columns={columns({ handleAddBonus, handleModal, tableData })}
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
