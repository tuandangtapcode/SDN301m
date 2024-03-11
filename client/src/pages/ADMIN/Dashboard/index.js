import { useEffect, useRef, useState } from "react"
import Chart from 'chart.js/auto'
import { Col, Row } from "antd";

const stackedChartData = {
  labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5'],
  datasets: [
    {
      label: 'Dữ liệu 1',
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1,
      type: 'bar',
      data: [10, 20, 15, 25, 30],
    },
    {
      label: 'Dữ liệu 2',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      type: 'line',
      data: [5, 15, 10, 20, 25],
    },
  ],
};

const pieChartData = {
  labels: ['Dữ liệu A', 'Dữ liệu B', 'Dữ liệu C'],
  datasets: [
    {
      backgroundColor: ['rgb(51,163,236)', 'rgb(255,206,85)', 'rgb(255,99,133)'],
      borderColor: ['rgba(255,99,132,1)', 'rgba(75,192,192,1)', 'rgba(255,205,86,1)'],
      borderWidth: 1,
      data: [30, 50, 20],
    },
  ],
};


const Dashboard = () => {
  const [loading, setLoading] = useState(false)
  const stackedChartRef = useRef();
  const pieChartRef = useRef();

  useEffect(() => {
    // Stacked Bar/Line Chart
    const stackedCtx = stackedChartRef.current.getContext('2d');
    const stackedChart = new Chart(stackedCtx, {
      type: 'bar',
      data: stackedChartData,
      options: {
        scales: {
          x: { stacked: true },
          y: { stacked: true },
        },
      },
    });

    // Pie Chart
    const pieCtx = pieChartRef.current.getContext('2d');
    const pieChart = new Chart(pieCtx, {
      type: 'pie',
      data: pieChartData,
    });

    return () => {
      stackedChart.destroy();
      pieChart.destroy();
    };
  }, [stackedChartData, pieChartData]);

  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <canvas ref={stackedChartRef} width="150" height="150"></canvas>
      </Col>
      <Col span={12}>
        <canvas ref={pieChartRef} width="150" height="150"></canvas>
      </Col>
    </Row>
  )

}

export default Dashboard