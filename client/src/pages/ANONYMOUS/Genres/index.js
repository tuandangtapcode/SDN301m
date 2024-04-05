import { Col, Pagination, Row } from "antd"
import { useEffect, useState } from "react"
import ComicItemList from "src/components/ComicItemList"
import SpinCustom from "src/components/SpinCustom"
import ComicService from "src/services/ComicService"
import { DivBorder, GenresStyled, RowStyled } from "./styled"
import { useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import { useNavigate, useParams } from "react-router-dom"

const Genres = () => {

  const navigate = useNavigate()
  const global = useSelector(globalSelector)
  const [comics, setComics] = useState()
  const [total, setTotal] = useState(0)
  const [genresDetail, setGenresDetail] = useState({})
  const [loading, setLoading] = useState(false)
  const { GenreID } = useParams()
  const [pagination, setPagination] = useState({
    TextSearch: "",
    CurrentPage: 1,
    PageSize: 4,
  })

  const getComics = async () => {
    try {
      setLoading(true)
      const res = await ComicService.getAllComicsByGenre({ ...pagination, GenreID })
      if (res?.isError) return
      setComics(res?.data?.List)
      setTotal(res?.data?.Total)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setPagination({
      TextSearch: "",
      CurrentPage: 1,
      PageSize: 4,
    })
  }, [GenreID])

  useEffect(() => {
    getComics()
  }, [pagination, GenreID])

  useEffect(() => {
    if (!!GenreID) {
      setGenresDetail(global?.genres?.find(i => i?._id === GenreID))
    }
  }, [GenreID])

  return (
    <SpinCustom spinning={loading}>
      <Row className="mt-50 mb-30" gutter={[16, 0]}>
        <Col span={18}>
          {
            !!GenreID &&
            <Col span={24}>
              <div className="text-center mb-15">
                <span className="fs-20">Truyện thể loại</span>
                <span className="fs-20 fw-600 ml-8">{genresDetail?.Title}</span>
              </div>
              <DivBorder className="text-center">{genresDetail?.ShortDescription}</DivBorder>
            </Col>
          }
          {comics?.length > 0 ?
            <Row gutter={[16, 16]}>
              {comics?.map(i =>
                <Col span={6}>
                  <ComicItemList comic={i} />
                </Col>
              )}
            </Row>
            :
            <p className="title-type-1">Chưa có truyện nào thuộc thể loại này</p>
          }
        </Col>
        <Col span={6}>
          <GenresStyled>
            <RowStyled className="title-header">Thể loại</RowStyled>
            <div
              className="title-header-2"
              onClick={() => {
                navigate(`/genres`)
              }}
            >
              Tất cả thể loại
            </div>
            <Row>
              {
                global?.genres?.map(i =>
                  <Col span={12}>
                    <RowStyled className={i?._id === GenreID ? "active" : ""} onClick={() => {
                      navigate(`/genre/${i?._id}`)
                    }}
                    >
                      {i?.Title}
                    </RowStyled>
                  </Col>
                )
              }
            </Row>
          </GenresStyled>
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

export default Genres