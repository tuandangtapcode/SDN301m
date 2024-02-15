import { Col, Row } from "antd"
import Content from "./component/Content"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Rating from "src/components/Rating"
import SpinCustom from "src/components/SpinCustom"
import ComicService from "src/services/ComicService"

const AuthorDetail = () => {

  const [loading, setLoading] = useState(false)
  const [detail, setDetail] = useState(false)
  const { AuthorID } = useParams()
  const [pagination, setPagination] = useState({
    TextSearch: "",
    CurrentPage: 1,
    PageSize: 10,
  })

  const getInforAuthor = async () => {
    try {
      setLoading(true)
      const res = await ComicService.getAllComicsByAuthor({ ...pagination, UserID: AuthorID, IsPrivated: false })
      if (res.isError) return
      setDetail(res?.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getInforAuthor()
  }, [pagination, AuthorID])

  return (
    <SpinCustom spinning={loading}>
      <Row gutter={[16, 16]} className="mt-20 mb-20">
        <Col span={18}>
          <Content
            detail={detail?.Author}
            setDetail={setDetail}
          />
        </Col>
        <Col span={6}>
          <Rating />
        </Col>
      </Row>
    </SpinCustom>
  )
}

export default AuthorDetail