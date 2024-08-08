import { Typography, Input, Row, Col } from "antd";
import useHttp from "../../hooks/useHttp";
import PromoteCard from "./components/PromoteCard";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Loader from "../../components/Shared/Loader";

const { Search } = Input;


const PromotionPage = () => {
  const { t } = useTranslation();
  const [isLoading, error, sendRequest] = useHttp();
  const [tableData, setTableData] = useState([]);
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
  console.log(tableData, "cvhjkl")

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <div>Something went wrong!!</div>;
  }

  return (
    <div>
      <Row style={{display:"flex", justifyContent:"space-between"}}>
        <Col>
      <Typography.Title level={3}>{t("promotions")}</Typography.Title>
      </Col>
      <Col>
      <Search
        placeholder="Enter employee name"
        style={{ width: 300, marginTop:"24px", marginRight:"20px" }}
        onSearch={handleSearch}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        enterButton
        allowClear
      />
      </Col>
      </Row>
      {tableData.map((promote) => (
        <PromoteCard promote={promote} />
      ))}
    </div>
  );
};

export default PromotionPage;
