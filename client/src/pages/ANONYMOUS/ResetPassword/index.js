import { Col, Form, Row } from "antd"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { ButtomCustomStyled } from "src/components/ButtonCustom/MyButton/styled"
import InputCustom from "src/components/FloatInput/InputCustom"
import UserService from "src/services/UserService"
import styled from "styled-components"
import { DotStyled } from "../Premium/styled"
import { getRegexPassowrd } from "src/lib/stringUtils"
import { useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"

const ResetPasswordContainer = styled.div`
width: 50%;
margin: auto;
`

const ResetPassword = () => {

  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const global = useSelector(globalSelector)

  const handleChangePassword = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      if (values?.NewPassword !== values?.ConfirmPassword) return toast.error("Mật khẩu không khớp")
      const res = await UserService.forgotPassword({ ...values, UserID: localStorage.getItem("usid") })
      if (!!res?.isError) return
      localStorage.removeItem("usid")
      navigate('/login')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!localStorage.getItem("usid") || !!global?.user?._id) {
      navigate('/')
    }
  }, [])

  return (
    <ResetPasswordContainer>
      <Form form={form}>
        <Row gutter={[16, 8]}>
          <Col span={24}>
            <div className="text-center mb-20 mt-35">
              <p className="fs-25 fw-600">Tạo mật khẩu mới</p>
            </div>
          </Col>
          <Col span={24}>
            <Form.Item
              name="NewPassword"
              rules={[
                { required: true, message: "Please enter new pasword" },
                { pattern: getRegexPassowrd(), message: "Mật khẩu sai định dạng" }
              ]}
            >
              <InputCustom
                isPass
                isRequired
                label="Mật khẩu mới"
              />
            </Form.Item>
            <div style={{ marginTop: '-10px' }}>
              <p className="text-gray">
                <DotStyled />
                Ký tự đầu tiên phải là một chữ cái in hoa (A-Z)
              </p>
              <p className="text-gray">
                <DotStyled />
                Các ký tự tiếp theo có thể là chữ cái (in hoa hoặc in thường) hoặc chữ số (0-9)
              </p>
              <p className="text-gray">
                <DotStyled />
                Ít nhất 5 ký tự tiếp theo
              </p>
            </div>
          </Col>
          <Col span={24}>
            <Form.Item
              name="ConfirmPassword"
              rules={[
                { required: true, message: "Please enter confirm pasword" },
              ]}
            >
              <InputCustom
                isPass
                isRequired
                label="Confirm password"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <ButtomCustomStyled
              className="submit fs-18 mb-35"
              loading={loading}
              onClick={() => handleChangePassword()}
            >
              Lưu
            </ButtomCustomStyled>
          </Col>
        </Row>
      </Form>
    </ResetPasswordContainer>
  )
}

export default ResetPassword