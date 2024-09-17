import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import useHttp from "../../../hooks/useHttp";
import {
  ApexChartState,
  getMonthName,
  SalaryData,
} from "../types/DashboardTypes";

const ApexChart: React.FC = () => {
  const [, , fetchData] = useHttp();
  const [data, setData] = useState<SalaryData[]>([]);
  const [chartState, setChartState] = useState<ApexChartState>({
    series: [{ name: "Applicants", data: [] }],
    options: {
      chart: {
        height: 370,
        type: "line",
        zoom: { enabled: false },
      },
      dataLabels: { enabled: false },
      stroke: { curve: "straight" },
      title: { text: "Applicants by Month", align: "left" },
      grid: {
        row: { colors: ["#f3f3f3", "transparent"], opacity: 0.5 },
      },
      xaxis: { categories: [] },
    },
  });

  useEffect(() => {
    fetchData(
      { url: `http://localhost:3000/recruitments/chart` },
      (data: SalaryData[]) => {
        setData(data);
      }
    );
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setChartState({
        series: [
          {
            name: "Bonus",
            data: data.map((bonus) => bonus.value),
          },
        ],
        options: {
          chart: {
            height: 300,
            type: "line",
            zoom: { enabled: false },
          },
          dataLabels: { enabled: false },
          stroke: { curve: "straight" },
          title: { text: "Applicants by Month", align: "left" },
          grid: {
            row: { colors: ["#f3f3f3", "transparent"], opacity: 0.5 },
          },
          xaxis: {
            categories: data.map((month) => getMonthName(month.label)),
          },
        },
      });
    }
  }, [data]);

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartState.options}
          series={chartState.series}
          type="line"
          height={300}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
