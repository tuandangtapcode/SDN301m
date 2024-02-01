import { useEffect, useState } from "react"
import { LoginContainerStyled } from "../LoginPage/styeld"
import { Col, Row, Form } from "antd"
import InputCustom from "src/components/FloatInput/InputCustom"
import { ButtomCustomStyled } from "src/components/ButtonCustom/MyButton/styled"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import { useGoogleLogin } from "@react-oauth/google"
import UserService from "src/services/UserService"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { getRegexEmail } from "src/lib/stringUtils"
import { useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"

const SignupPage = () => {

  const [form] = Form.useForm()
  const [loading, setLoading] = useState()
  const global = useSelector(globalSelector)
  const navigate = useNavigate()

  const registerByGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfor = await UserService.getInforByGoogleLogin(tokenResponse?.access_token)
      const res = await UserService.registerByGoogle(userInfor)
      if (res?.isError) return toast.error(res?.msg)
      toast.success(res?.msg)
      navigate('/login')
    },
  })


  const registerByForm = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await UserService.register(values)
      if (res?.isError) return toast.error(res?.msg)
      toast.success(res?.msg)
      navigate('/login')
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
              <p className="fs-25 fw-600">Sign up to use</p>
            </div>
          </Col>
          <Col span={24}>
            <Form.Item
              name="FullName"
              rules={[
                { required: true, message: "Hãy nhập vào email" },
              ]}
            >
              <InputCustom
                isRequired
                label="FullName"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="Email"
              rules={[
                { required: true, message: "Hãy nhập vào email" },
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
                { required: true, message: "Hãy nhập vào pasword" },
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
              onClick={() => registerByForm()}
            >
              Sign up
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
              onClick={() => registerByGoogle()}
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
  );
}

export default SignupPage;