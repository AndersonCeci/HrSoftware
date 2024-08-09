import { Typography, Input, Row, Col, Flex } from "antd";
import useHttp from "../../hooks/useHttp";
import PromoteCard from "./components/PromoteCard";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Loader from "../../components/Shared/Loader";
import { PromoteType } from "./types/PromoteType";

const { Search } = Input;

const PromotionPage: React.FC = () => {
  const { t } = useTranslation();
  const [isLoading, error, sendRequest] = useHttp();
  const [tableData, setTableData] = useState<PromoteType[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    sendRequest(
      {
        url: `http://localhost:3000/promotions/promotion-history`,
        headers: {
          "Content-Type": "application/json",
        },
      },
      setTableData
    );
  }, []);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const filteredData = tableData.filter((promote) =>
    promote?.employeeName?.toLowerCase().includes(searchValue.toLowerCase())
  );

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <div>Something went wrong!!</div>;
  }

  return (
    <div>
      <Typography.Title level={3}>{t("promotions")}</Typography.Title>
      <p style={{ fontWeight: "lighter" }}>
        {t("viewPromotionRecordsForEmployees")}
      </p>
      <div >
      <Search
        placeholder={t("enterEmployeeName")}
        style={{ width: "100%", marginBottom: "20px", color: "red" }}
        styles={{ affixWrapper: { backgroundColor: "#e6f4ff" } }}
        onSearch={handleSearch}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        enterButton
        allowClear
        size="large"
      />
      </div>
      <Flex>
        {filteredData.map((promote) => (
          <PromoteCard key={promote._id} promote={promote} />
        ))}
      </Flex>
    </div>
  );
};

export default PromotionPage;
