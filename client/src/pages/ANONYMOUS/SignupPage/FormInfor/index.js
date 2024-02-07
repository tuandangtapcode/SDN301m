import { useGoogleLogin } from "@react-oauth/google";
import { Col, Form, Radio, Row } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonCustom from "src/components/ButtonCustom/MyButton";
import { ButtomCustomStyled } from "src/components/ButtonCustom/MyButton/styled";
import InputCustom from "src/components/FloatInput/InputCustom";
import { getRegexEmail } from "src/lib/stringUtils";
import UserService from "src/services/UserService";

const FormInfor = ({
  form,
  current,
  setCurrent,
  inforFormGoogle,
  setInforFromGoogle
}) => {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const validateByGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfor = await UserService.getInforByGoogleLogin(tokenResponse?.access_token)
      if (!!userInfor) {
        setCurrent(current + 1)
      } else {
        return toast.error("Have something error")
      }
    },
  })

  const validateByForm = async () => {
    try {
      setLoading(true)
      await form.validateFields()
      setCurrent(current + 1)
    } finally {
      setLoading(false)
    }
  }


  return (
    <>
      <Col span={24}>
        <Form.Item
          name="FullName"
          rules={[
            { required: true, message: "Please enter your fullname" },
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
            { required: true, message: "Please enter your pasword" },
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
          onClick={() => validateByForm()}
        >
          Next
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
          onClick={() => validateByGoogle()}
        >
          <span className="icon-google"></span>
          <span className="ml-12">Sign up with Google</span>
        </ButtonCustom>
      </Col>
      <Col span={24}>
        <ButtonCustom
          className="d-flex-center login-facebook medium mb-30"
        >
          <span className="icon-facebook"></span>
          <span className="ml-12">Sign up with Facebook</span>
        </ButtonCustom>
      </Col>
    </>
  );
}

export default FormInfor;