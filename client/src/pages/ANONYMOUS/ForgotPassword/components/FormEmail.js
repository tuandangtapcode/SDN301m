import { Col, Form } from "antd"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import InputCustom from "src/components/FloatInput/InputCustom"
import { getRegexEmail } from "src/lib/stringUtils"

const FormEmail = ({ loading, handleSendMail }) => {

  return (
    <>
      <Col span={24}>
        <div className="text-center fs-25 fw-700 mb-12 title-type-1">Reset mật khẩu của bạn</div>
      </Col>
      <Col span={24}>
        <div className="mb-16">
          Nhập địa chỉ email hoặc tên người dùng của bạn và chúng tôi sẽ gửi cho bạn một liên kết để quay lại tài khoản của bạn.
        </div>
      </Col>
      <Col span={24}>
        <Form.Item
          name="Email"
          rules={[
            { required: true, message: "Hãy nhập vào email của bạn" },
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
        <div className="text-center">
          <ButtonCustom
            className="small greendBackground ml-12"
            loading={loading}
            onClick={() => handleSendMail()}
          >
            Gửi
          </ButtonCustom>
        </div>
      </Col>
    </>
  )
}

export default FormEmail