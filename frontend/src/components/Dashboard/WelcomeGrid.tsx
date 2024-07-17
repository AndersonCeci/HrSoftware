import { Doughnut } from "react-chartjs-2";
import { Data } from "../../pages/DashboardPage";
import "../../styles/Dashboard/WelcomeGrid.css";
import { Row, Col, Typography } from "antd";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const { Title, Text } = Typography;

interface WelcomeGridProps {
  initialData: Data[];
}

export const WelcomeGrid: React.FC<WelcomeGridProps> = ({ initialData }) => {
  const data = {

    datasets: [
      {
        label: "Days",
        data: [6, 1],
        backgroundColor: ["#73dbfe", "#fe7570"],
        borderColor: ["#73dbfe", "#fe7570"],
      },
    ],
    labels: ["At work", "Leaves"],
  };

  const options= {

  }

  return (
    <>
      <div className="welcome-grid">
        <div>
          {initialData.map((data) => {
            return (
              <Row gutter={[16, 48]} key={data.status}>
                <Col span={12} style={{ gap: "10px" }}>
                  <div
                    className="active-dashboard"
                    style={{ backgroundColor: data.color }}
                  >
                    <Title style={{ margin: 0, color:"#666666" }}>{data.noEmployee}</Title>
                    <Text style={{ fontSize: 20, color:"#666666" }}>{data.status}</Text>
                  </div>
                </Col>
              </Row>
            );
          })}
        </div>
        <div className="pie-chart">
          <Title style={{marginTop: 15, color:"#666666", textAlign:"center", fontSize:23}}>Attendance Overview</Title>
          <Doughnut style={{marginTop: '15px'}} data={data} options={options}></Doughnut>
        </div>
      </div>
    </>
  );
};

export default WelcomeGrid;
