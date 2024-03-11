import { useGoogleLogin } from "@react-oauth/google"
import { Col, Form } from "antd"
import { toast } from "react-toastify"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import { ButtomCustomStyled } from "src/components/ButtonCustom/MyButton/styled"
import InputCustom from "src/components/FloatInput/InputCustom"
import { getRegexEmail, getRegexPassowrd } from "src/lib/stringUtils"
import { DotStyled } from "src/pages/ANONYMOUS/Premium/styled"
import UserService from "src/services/UserService"

const FormInfor = ({
  form,
  current,
  setCurrent,
  setInforFromGoogle,
  setInforFromForm
}) => {

  const validateByGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfor = await UserService.getInforByGoogleLogin(tokenResponse?.access_token)
      if (!!userInfor) {
        setInforFromGoogle(userInfor)
        setCurrent(current + 1)
      } else {
        return toast.error("Have something error")
      }
    },
  })

  const validateByForm = async () => {
    const values = await form.validateFields()
    setInforFromForm(values)
    setCurrent(current + 1)
  }


  return (
    <>
      <Col span={24}>
        <Form.Item
          name="FullName"
          rules={[
            { required: true, message: "Hãy nhập vào tên của bạn" },
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
            { required: true, message: "Hãy nhập vào email của bạn" },
            { pattern: getRegexEmail(), message: "Chữ ký tự đầu tiên fai là viết hoa" }
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
            { required: true, message: "Hãy nhập vào mật khẩu của bạn" },
            { pattern: getRegexPassowrd(), message: "Mật khẩu sai định dạng" }
          ]}
        >
          <InputCustom
            isPass
            isRequired
            label="Mật khẩu"
          />
          <div className="mt-8">
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
        </Form.Item>
      </Col>
      <Col span={24}>
        <ButtomCustomStyled
          className="submit fs-18"
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
  )
}

export default FormInfor