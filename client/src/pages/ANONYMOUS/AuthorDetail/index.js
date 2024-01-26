import { Col, Row } from "antd";
import Content from "./component/Content";
import Ranking from "./component/Ranking";
import { useEffect, useState } from "react";
import UserService from "src/services/UserService";
import { useParams } from "react-router-dom";

const AuthorDetail = () => {
  const [loading, setLoading] = useState(false)
  const [detail, setDetail] = useState(false)
  const UserID = useParams()

  const getList = async () => {
    try {
      setLoading(true)
      const res = await UserService.getDetailProfile(UserID?.AuthorID)
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
    <Row gutter={[16, 16]} className="mt-20 mb-20">
      <Col span={18}>
        <Content
          detail={detail}
        />
      </Col>
      <Col span={6}>
        <Ranking
          detail={detail}
        />
      </Col>
    </Row>
  );
}

export default AuthorDetail;