import { Col, Form, Row } from "antd"
import { ButtomCustomStyled } from "src/components/ButtonCustom/MyButton/styled"
import { useEffect, useState } from "react"
import { useGoogleLogin } from "@react-oauth/google"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import { LoginContainerStyled } from "./styeld"
import { jwtDecode } from "jwt-decode"
import InputCustom from "src/components/FloatInput/InputCustom"
import UserService from "src/services/UserService"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import globalSlice from "src/redux/globalSlice"
import { useNavigate } from "react-router-dom"
import { getRegexEmail } from "src/lib/stringUtils"
import { globalSelector } from "src/redux/selector"


const LoginPage = () => {

  const [form] = Form.useForm()
  const [loading, setLoading] = useState()
  const global = useSelector(globalSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loginByGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfor = await UserService.getInforByGoogleLogin(tokenResponse?.access_token)
      const res = await UserService.loginByGoogle(userInfor)
      if (res?.isError) return toast.error(res?.msg)
      const user = jwtDecode(res?.data)
      if (!!user.payload.id) {
        getProfile(user.payload.id, res?.data)
      } else {
        navigate('/forbidden')
      }
    },
  })

  const loginByForm = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await UserService.login(values)
      if (res?.isError) return toast.error(res?.msg)
      const user = jwtDecode(res?.data)
      if (!!user.payload.id) {
        getProfile(user.payload.id, res?.data)
      } else {
        navigate('/forbidden')
      }
    } finally {
      setLoading(false)
    }
  }

  const getProfile = async (UserID, token) => {
    try {
      setLoading(true)
      const res = await UserService.getDetailProfile(UserID, token)
      if (res?.isError) return toast.error(res?.msg)
      dispatch(globalSlice.actions.setUser(res?.data))
      localStorage.setItem('token', token)
      if (res?.data?.RoleID === 1) navigate('/dashboard')
      else navigate('/')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!!global?.user?._id) navigate('/')
  }, [])

  return (
    <LoginContainerStyled>
      <Form form={form} className="mt-30">
        <Row gutter={[16, 0]}>
          <Col span={24}>
            <div className="text-center mb-20">
              <p className="fs-25 fw-600">Log in to download</p>
              <p>Access our library with a free account</p>
            </div>
          </Col>
          <Col span={24}>
            <Form.Item
              name="Email"
              rules={[
                { required: true, message: "Please enter your email" },
                { pattern: getRegexEmail(), message: "Email sai định dạng" }
              ]}
            >
              <InputCustom
                isRequired
                label="Email"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="Password"
              rules={[
                { required: true, message: "Please enter new pasword" },
              ]}
            >
              <InputCustom
                isPass
                isRequired
                label="Mật khẩu"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <ButtomCustomStyled
              className="submit fw-600 fs-18"
              loading={loading}
              onClick={() => loginByForm()}
            >
              Log in
            </ButtomCustomStyled>
          </Col>
          <Col span={24}>
            <div className="text-center text-gray fs-20 mt-10 mb-10">
              OR
            </div>
          </Col>
          <Col span={24}>
            <ButtonCustom
              className="d-flex-center login-google medium mb-15"
              onClick={() => loginByGoogle()}
            >
              <span className="icon-google"></span>
              <span className="ml-12">Sign in with Google</span>
            </ButtonCustom>
          </Col>
          <Col span={24}>
            <ButtonCustom
              className="d-flex-center login-facebook medium mb-30"
            >
              <span className="icon-facebook"></span>
              <span className="ml-12">Sign in with Facebook</span>
            </ButtonCustom>
          </Col>
        </Row>
      </Form>
    </LoginContainerStyled>
  )
}

export default LoginPage