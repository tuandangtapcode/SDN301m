import { Col, Form, Row } from "antd"
import { ButtomCustomStyled } from "src/components/ButtonCustom/MyButton/styled"
import { useState } from "react"
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import { LoginContainerStyled } from "./styeld"
import { jwtDecode } from "jwt-decode"
import InputCustom from "src/components/FloatInput/InputCustom"
import UserService from "src/services/UserService"


const LoginPage = () => {

  const [form] = Form.useForm()
  const [loading, setLoading] = useState()

  const loginByGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const res = await UserService.getInforByGoogleLogin(tokenResponse?.access_token)
      console.log('res', res);
    },
  });

  const loginByForm = async () => {

  }

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
            <Form.Item>
              <InputCustom
                label="Email"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <InputCustom
                label="Mật khẩu"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <ButtomCustomStyled
              className="submit fw-600 fs-18"
              loading={loading}
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
  );
}

export default LoginPage;