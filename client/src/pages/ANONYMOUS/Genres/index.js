import { Col, Row } from "antd"
import { useEffect, useState } from "react"
import ComicItemList from "src/components/ComicItemList"
import SpinCustom from "src/components/SpinCustom"
import ComicService from "src/services/ComicService"
import { GenresStyled, RowStyled } from "./styled"
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
  const { GenresID } = useParams()
  const [pagination, setPagination] = useState({
    TextSearch: "",
    CurrentPage: 1,
    PageSize: 10,
  })

  const getComics = async () => {
    try {
      setLoading(true)
      const res = await ComicService.getAllComicsByGenre({ ...pagination, GenresID })
      if (res?.isError) return
      setComics(res?.data?.List)
      setTotal(res?.data?.Total)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getComics()
  }, [pagination, GenresID])

  useEffect(() => {
    if (!!GenresID) {
      setGenresDetail(global?.genres?.find(i => i?._id === GenresID))
    }
  }, [GenresID])

  return (
    <SpinCustom spinning={loading}>
      <Row className="mt-50">
        <Col span={16}>
          {
            !!GenresID &&
            <Col span={24}>
              <div className="text-center">
                <span>Truyện thể loại</span>
                <span>{genresDetail?.Title}</span>
              </div>
              <div className="text-center">{genresDetail?.ShortDecription}</div>
            </Col>
          }
          <Row gutter={[16, 0]}>
            {
              comics?.map(i =>
                <Col span={6}>
                  <ComicItemList comic={i} />
                </Col>
              )
            }
          </Row>
        </Col>
        <Col span={8}>
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
                    <RowStyled className={i?._id === GenresID ? "active" : ""} onClick={() => {
                      navigate(`/genres/${i?._id}`)
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
      </Row>
    </SpinCustom >
  )
}

export default Genres