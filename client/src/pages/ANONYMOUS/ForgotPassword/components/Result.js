import { Col } from "antd"
import { useNavigate } from "react-router-dom"
import ButtonCustom from "src/components/ButtonCustom/MyButton"

const Result = () => {

  const navigate = useNavigate()

  return (
    <>
      <Col span={24}>
        <div className="text-center fs-25 fw-700 mb-12 title-type-1">Email đã được gửi</div>
      </Col>
      <Col span={24}>
        Chúng tôi đã gửi cho bạn một email. Làm theo hướng dẫn để lấy lại tài khoản của bạn.
      </Col>
      <ButtonCustom
        className="small greendBackground mt-12"
        onClick={() => navigate('/login')}
      >
        Trở về đăng nhập
      </ButtonCustom>
    </>
  )
}

export default Result