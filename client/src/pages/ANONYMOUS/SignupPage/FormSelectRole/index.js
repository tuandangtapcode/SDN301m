import { Checkbox, Col, Form, Radio } from "antd";
import { ButtomCustomStyled } from "src/components/ButtonCustom/MyButton/styled";

const FormSelectRole = ({
  handleRegister,
  isAgree,
  setIsAgree,
  loading
}) => {



  return (
    <>
      <Col span={24} className="d-flex-sb">
        <Form.Item
          name="RoleID"
          rules={[
            { required: true, message: "Please select role account" },
          ]}
        >
          <Radio.Group >
            <Radio className="border-radio" value={3}>Author</Radio>
            <Radio className="border-radio" value={5}>Customer normal</Radio>
          </Radio.Group>
        </Form.Item>
      </Col>
      <Col span={24}>
        <Checkbox
          className="text" value="A"
          onChange={() => setIsAgree(true)}
        >
          I agree to the terms and conditions
        </Checkbox>
      </Col>
      <Col span={24}>
        <ButtomCustomStyled
          className="submit fw-600 fs-18"
          loading={loading}
          disabled={!!isAgree ? false : true}
          onClick={() => handleRegister()}
        >
          Sign up
        </ButtomCustomStyled>
      </Col>
    </>
  );
}

export default FormSelectRole;