import { Col, Row } from "antd"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ComicItemList from "src/components/ComicItemList"
import Rating from "src/components/Rating"
import SpinCustom from "src/components/SpinCustom"
import ComicService from "src/services/ComicService"

const HomePage = () => {

  const navigate = useNavigate()
  const [comics, setComics] = useState()
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    TextSearch: "",
    CurrentPage: 1,
    PageSize: 10,
  })

  const getComics = async () => {
    try {
      setLoading(true)
      const res = await ComicService.getAllComics({ ...pagination, isAdmin: false })
      if (res?.isError) return
      setComics(res?.data?.List)
      setTotal(res?.data?.Total)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getComics()
  }, [pagination])

  return (
    <SpinCustom spinning={loading}>
      <p className="fs-25 fw-600 text-matte mt-20 mb-20">Truyện mới cập nhật</p>
      <Row className="mb-30">
        <Col span={16}>
          <Row gutter={[16, 0]}>
            {
              comics?.map(i =>
                <Col span={6} onClick={() => navigate(`/comic/${i?._id}`)}>
                  <ComicItemList comic={i} />
                </Col>
              )
            }
          </Row>
        </Col>

        <Col span={8}>
          <Rating />
        </Col>
      </Row>
    </SpinCustom>
  )
}

export default HomePage