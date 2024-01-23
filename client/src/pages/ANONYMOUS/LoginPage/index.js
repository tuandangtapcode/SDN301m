import { Col, Form, Row } from "antd"
import { ButtomCustomStyled } from "src/components/ButtonCustom/MyButton/styled"
import { useState } from "react"
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import { LoginContainerStyled } from "./styeld"
import { jwtDecode } from "jwt-decode"
import InputCustom from "src/components/FloatInput/InputCustom"


const LoginPage = () => {

  const [form] = Form.useForm()
  const [loading, setLoading] = useState()

  const login = useGoogleLogin({
    onSuccess: credentialResponse => console.log('credentialResponse  ', credentialResponse),
  });

  return (
    <LoginContainerStyled>
      <Form form={form} className="mt-50">
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
                type="isPassword"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <ButtomCustomStyled
              className="submit fw-600 fs-18"
              loading={loading}
            >
              Continued
            </ButtomCustomStyled>
          </Col>
          <Col span={24}>
            <div className="text-center text-gray fs-20 mt-10 mb-10">
              OR
            </div>
          </Col>
          <Col span={24}>
            <GoogleLogin
              onSuccess={credentialResponse => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
            <ButtonCustom
              className="d-flex-center login-google medium mb-15"
              onClick={() => login()}
            >
              <span className="icon-google"></span>
              <span className="ml-12">Sign in with Google</span>
            </ButtonCustom>
          </Col>
          <Col span={24}>
            <ButtonCustom
              className="d-flex-center login-facebook medium mb-15"
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