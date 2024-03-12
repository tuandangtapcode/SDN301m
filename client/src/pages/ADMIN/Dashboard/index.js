import { useEffect, useRef, useState } from "react"
import Chart from 'chart.js/auto'
import { Button, Col, Row, Select, Space } from "antd";
import PackageService from "src/services/PackageService";
import ComicService from "src/services/ComicService";

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
  const [topComics, setTopComics] = useState([])
  const [activeKey, setActiveKey] = useState(0)

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

  const getListHotComics = async () => {
    try {
      setLoading(true)
      const res = await ComicService.getAllHotComics(activeKey)
      if (res?.isError) return
      setTopComics(res?.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListHotComics()
  }, [activeKey])

  const stackedChartData = {
    labels: topComics.map(c => c?.Title),
    datasets: [
      {
        label: 'Lượt đọc',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        type: 'bar',
        data: topComics.map(c => c?.Reads),
      },
      {
        label: 'Lượt yêu thích',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        type: 'line',
        data: topComics.map(c => c?.Likes),
      },
    ],
  }

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
  }, [stackedChartData])


  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <p className="title-type-1">Thống kê lượt đọc và yêu thích</p>
        <div className="d-flex-end">
          <Select
            defaultValue={0}
            onChange={(e) => setActiveKey(e)}
            style={{ width: '150px' }}
          >
            <Select.Option value={0}>Tất cả</Select.Option>
            <Select.Option value={30}>Theo tháng</Select.Option>
            <Select.Option value={7}>Theo tuần</Select.Option>
          </Select>
        </div>
        <canvas ref={stackedChartRef} style={{ width: '200px', height: '250px' }}></canvas>
      </Col>
      <Col span={12}>
        <p className="title-type-1">Thống kê mua các gói Premium</p>
        <canvas ref={pieChartRef} style={{ width: '200px', height: '200px' }}></canvas>
      </Col>
    </Row>
  )

}

export default Dashboard