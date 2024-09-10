import { useRecruitmentContext } from "./context";
import Table from "../../components/Table/Table";
import TableHeader from "../../components/Table/TableHeader";
import Drawer from "../../components/Shared/Drawer";
import Stepper from "./components/Stepper";
import { columns as generateColumns } from "./columns/columns";
import usePagination from "../../hooks/usePagination";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Col, message, Row, Select } from "antd";
import { menuItems, referenceItems } from "./columns/constants";
import React from "react";
import Search from "antd/lib/input/Search";
import { useSearchParams } from "react-router-dom";
import { getDevRoles } from "../Employment/utils/helperFunctions";
import { ButtonType } from "../../enums/Button";

export interface Filters {
  name?: string | null;
  surname?: string | null;
  stage?: string | null;
  reference?: string | null;
  position?: string | null;
}

export const RecruitmentContent: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<Filters>({
    name: searchParams.get("name"),
    surname: searchParams.get("surname"),
    stage: searchParams.get("stage"),
    reference: searchParams.get("reference"),
    position: searchParams.get("position"),
  });

  const { t } = useTranslation();
  const {
    tableData,
    drawerState,
    setDrawerState,
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

  const updateSearchParams = (updatedFilters: Filters) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(updatedFilters)) {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    setSearchParams(params);
  };

  const handleStageChange = (value: string) => {
    const newFilters = { ...filters, stage: value };
    setFilters(newFilters);
    updateSearchParams(newFilters);
    message.info(`Selected stage: ${value}`);
  };
  const handlePositionChange = (value: string) => {
    const newFilters = { ...filters, position: value };
    setFilters(newFilters);
    updateSearchParams(newFilters);
    message.info(`handlePositionChange: ${value}`);
  };

  const handleReferenceChange = (value: string) => {
    const newFilters = { ...filters, reference: value };
    setFilters(newFilters);
    updateSearchParams(newFilters);
    message.info(`Selected reference: ${value}`);
  };

  const handleSearch = (value: string) => {
    const [name, surname] = value.split(" ");
    const newFilters = {
      ...filters,
      name: name || null,
      surname: surname || null,
    };
    setFilters(newFilters);
    updateSearchParams(newFilters);
  };
  const handleClearFilters = () => {
    const clearedFilters: Filters = {
      name: null,
      surname: null,
      stage: null,
      reference: null,
      position: null,
    };
    setFilters(clearedFilters);
    setSearchParams(new URLSearchParams());
  };

  const positions = getDevRoles().map((role) => ({
    label: role,
    value: role,
  }));

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
      <Row
        gutter={[10, 10]}
        align="stretch"
        style={{ maxWidth: "100%", padding: "10px" }}
      >
        <Col>
          <Search
            placeholder={"Search applicant"}
            style={{ width: 300 }}
            enterButton
            allowClear
            onSearch={handleSearch}
          />
        </Col>
        <Col>
          <Select
            allowClear
            placeholder="Select Phase"
            style={{ width: 200 }}
            options={menuItems?.map((item) => ({
              label: item?.label,
              value: item?.key,
            }))}
            value={filters.stage}
            onChange={handleStageChange}
          />
        </Col>
        <Col>
          <Select
            allowClear
            placeholder="Select Reference"
            style={{ width: 200 }}
            options={referenceItems?.map((item) => ({
              label: item?.label,
              value: item?.key,
            }))}
            value={filters.reference}
            onChange={handleReferenceChange}
          />
        </Col>
        <Col>
          <Select
            allowClear
            placeholder="Select position"
            style={{ width: 200 }}
            options={positions}
            onChange={handlePositionChange}
            value={filters.position}
          />
        </Col>
        <Col>
          <Button onClick={handleClearFilters} type={ButtonType.PRIMARY}>
            Clear filters
          </Button>
        </Col>
      </Row>
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
