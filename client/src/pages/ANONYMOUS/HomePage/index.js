import { Col, Pagination, Row } from "antd"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import ComicItemList from "src/components/ComicItemList"
import Rating from "src/components/Rating"
import SpinCustom from "src/components/SpinCustom"
import ComicService from "src/services/ComicService"

const HomePage = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const [comics, setComics] = useState()
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    TextSearch: "",
    CurrentPage: 1,
    PageSize: 4,
  })
  const queryParams = new URLSearchParams(location.search)

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
    if (!!location.search && !!queryParams.get("query")) {
      setPagination({ ...pagination, TextSearch: queryParams.get("query") })
    } else if (!!location.search && !queryParams.get("query")) {
      navigate('/not-found')
    }
  }, [queryParams.get("query")])

  useEffect(() => {
    getComics()
  }, [pagination])


  return (
    <SpinCustom spinning={loading}>
      <p className="fs-25 fw-600 text-matte mt-20 mb-20">Truyện mới cập nhật</p>
      <Row gutter={[16, 0]} className="mb-30">
        <Col span={16}>
          <Row gutter={[16, 16]}>
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
        <Col span={16}>
          <div className="text-center">
            <Pagination
              current={pagination?.CurrentPage}
              total={Math.ceil(total / pagination?.PageSize) * 10}
              onChange={e => setPagination({ ...pagination, CurrentPage: e })}
            />
          </div>
        </Col>
      </Row>
    </SpinCustom >
  )
}

export default HomePage