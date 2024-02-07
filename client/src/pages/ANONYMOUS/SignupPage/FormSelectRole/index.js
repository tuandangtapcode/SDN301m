import { useGoogleLogin } from "@react-oauth/google";
import { Checkbox, Col, Form, Radio, Row } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonCustom from "src/components/ButtonCustom/MyButton";
import { ButtomCustomStyled } from "src/components/ButtonCustom/MyButton/styled";
import UserService from "src/services/UserService";

const FormSelectRole = ({
  form,
  handleRegister,
  isAgree,
  setIsAgree
}) => {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)


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
          Tôi không muốn nhận tin nhắn tiếp thị từ Spotify
        </Checkbox>
      </Col>
      <Col span={24}>
        <ButtomCustomStyled
          className="submit fw-600 fs-18"
          loading={loading}
          onClick={() => handleRegister()}
        >
          Sign up
        </ButtomCustomStyled>
      </Col>
    </>
  );
}

export default FormSelectRole;