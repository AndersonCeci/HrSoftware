import ReactApexChart from "react-apexcharts";
import React from "react";
import { Card } from "antd";

interface ApexChartState {
  series: {
    name: string;
    data: number[];
  }[];
  options: {
    chart: {
      height: number;
      type: "line";
      zoom: {
        enabled: boolean;
      };
    };
    dataLabels: {
      enabled: boolean;
    };
    stroke: {
      curve: "straight";
    };
    title: {
      text: string;
      align: "left";
    };
    grid: {
      row: {
        colors: string[];
        opacity: number;
      };
    };
    xaxis: {
      categories: string[];
    };
  };
}

class ApexChart extends React.Component<{}, ApexChartState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      series: [
        {
          name: "Applicants",
          data: [10, 2, 3, 1, 20, 5, 4, 0, 2],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: "Applicants by Month",
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
          ],
        },
      },
    };
  }

  render() {
    return (
      <div>
        <div id="chart">
          <Card style={{boxShadow: "3.9px 7.8px 7.8px hsla(0, 0%, 69%, 0.407)"}}>
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height={265}
          />
          </Card>
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default ApexChart;
