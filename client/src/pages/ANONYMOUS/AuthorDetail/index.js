import { Col, Row } from "antd"
import Content from "./component/Content"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Rating from "src/components/Rating"
import SpinCustom from "src/components/SpinCustom"
import UserService from "src/services/UserService"

const AuthorDetail = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [detail, setDetail] = useState()
  const [list, setList] = useState([])
  const { AuthorID } = useParams()
  const [pagination, setPagination] = useState({
    CurrentPage: 1,
    PageSize: 10,
  })

  const getInforAuthor = async () => {
    try {
      setLoading(true)
      const res = await UserService.getDetailAuthor({
        ...pagination,
        UserID: AuthorID,
        IsPrivated: false,
      })
      if (res.isError) return navigate("/not-found")
      setDetail(res?.data)
      setList(res?.data?.List)
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
        <Col span={16}>
          <Content
            detail={detail?.Author}
            setDetail={setDetail}
            list={list}
            setList={setList}
          />
        </Col>
        <Col span={8}>
          <Rating />
        </Col>
      </Row>
    </SpinCustom>
  )
}

export default AuthorDetail
