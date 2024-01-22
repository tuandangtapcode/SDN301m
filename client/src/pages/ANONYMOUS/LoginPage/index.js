import { Col, Form, Row } from "antd"
import InputCustom from "src/components/FloatInput/InputCustom"
import styled from "styled-components"
import { ButtomCustomStyled } from "src/components/ButtonCustom/MyButton/styled"
import { useState } from "react"

const LoginContainerStyled = styled.div`
max-width: 30%;
margin: auto;
`

const LoginPage = () => {

  const [form] = Form.useForm()
  const [loading, setLoading] = useState()

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
                placeholder="Email"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <InputCustom
                placeholder="Mật khẩu"
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
            <div className="text-center text-gray fs-20 mt-15">
              OR
            </div>
          </Col>
          <Col span={24}>
            {/* <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
              buttonText="Continued with Google"
              // onSuccess={responseGoogle}
              // onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />, */}
          </Col>
        </Row>
      </Form>
    </LoginContainerStyled>
  );
}

export default LoginPage;