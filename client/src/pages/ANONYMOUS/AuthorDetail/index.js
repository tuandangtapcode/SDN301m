import { Col, Row } from "antd"
import Content from "./component/Content"
import { useEffect, useState } from "react"
import UserService from "src/services/UserService"
import { useParams } from "react-router-dom"
import Rating from "src/components/Rating"
import SpinCustom from "src/components/SpinCustom"

const AuthorDetail = () => {
  const [loading, setLoading] = useState(false)
  const [detail, setDetail] = useState(false)
  const UserID = useParams()

  console.log(UserID);
  const getList = async () => {
    try {
      setLoading(true)
      const res = await UserService.getDetailAuthour(UserID?.AuthorID)
      if (res.IsError) return
      setDetail(res?.data)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getList()
  }, [])

  return (
    <SpinCustom spinning={loading}>
      <Row gutter={[16, 16]} className="mt-20 mb-20">
        <Col span={18}>
          <Content
            detail={detail}
            setDetail={setDetail}
          />
        </Col>
        <Col span={6}>
          <Rating />
        </Col>
      </Row>
    </SpinCustom>
  );
}

export default AuthorDetail