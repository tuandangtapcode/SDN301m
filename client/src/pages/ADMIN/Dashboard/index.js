import { useEffect, useRef, useState } from "react"
import Chart from 'chart.js/auto'
import { Col, Row } from "antd";
import PackageService from "src/services/PackageService";

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
}

const ColorPie = [
  'rgb(51,163,236)',
  'rgb(255,206,85)',
  'rgb(255,99,133)',
  'rgb(75,192,192)',
  'rgb(54,162,235)',
  'rgb(153,102,255)',
  'rgb(197,199,204)',
]


const Dashboard = () => {
  const [loading, setLoading] = useState(false)
  const stackedChartRef = useRef();
  const pieChartRef = useRef()
  const [packages, setPackages] = useState([])

  const getPackages = async () => {
    try {
      setLoading(true)
      const res = await PackageService.getAllPackages({
        CurrentPage: 1,
        PageSize: 10,
      })
      if (res?.isError) return
      setPackages(res?.data?.List)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getPackages()
  }, [])

  const pieChartData = {
    labels: packages.map(p => p.Title),
    datasets: [
      {
        backgroundColor: ColorPie,
        borderColor: ColorPie,
        borderWidth: 1,
        data: packages.map(p => p.Quantity),
      },
    ],
  }

  useEffect(() => {
    // Stacked Bar/Line Chart
    const stackedCtx = stackedChartRef.current.getContext('2d')
    const stackedChart = new Chart(stackedCtx, {
      type: 'bar',
      data: stackedChartData,
      options: {
        scales: {
          x: { stacked: true },
          y: { stacked: true },
        },
      },
    })

    // Pie Chart
    const pieCtx = pieChartRef.current.getContext('2d')
    const pieChart = new Chart(pieCtx, {
      type: 'pie',
      data: pieChartData,
    });

    return () => {
      stackedChart.destroy();
      pieChart.destroy();
    };
  }, [stackedChartData, pieChartData])


  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <canvas ref={stackedChartRef} width="150" height="150"></canvas>
      </Col>
      <Col span={12}>
        <p className="title-type-1">Thống kê mua các gói Premium</p>
        <canvas ref={pieChartRef} width="150" height="150"></canvas>
      </Col>
    </Row>
  )

}

export default Dashboard