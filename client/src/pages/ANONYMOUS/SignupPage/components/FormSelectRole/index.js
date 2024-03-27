import { Button, Checkbox, Col, Form, Radio } from "antd"
import { useState } from "react"
import { AiOutlineLeft } from "react-icons/ai"
import { ButtomCustomStyled } from "src/components/ButtonCustom/MyButton/styled"

const FormSelectRole = ({
  current,
  setCurrent,
  handleRegister,
  isAgree,
  setIsAgree,
  loading,
  data,
  setData
}) => {

  return (
    <>
      <Col>
        <Button
          className="d-flex align-items-center icon-back text-gray fs-18 mb-15"
          onClick={() => setCurrent(current - 1)}
        >
          <AiOutlineLeft className="mr-8" />
          <span>Quay lại</span>
        </Button>
      </Col>
      <Col span={24} className="d-flex-sb">
        <Form.Item
          name="RoleID"
          rules={[
            { required: true, message: "Please select role account" },
          ]}
        >
          <Radio.Group onChange={e => setData({ ...data, RoleID: e.target.value })}>
            <Radio className="border-radio" value={3}>Author</Radio>
            <Radio className="border-radio" value={5}>Customer normal</Radio>
          </Radio.Group>
        </Form.Item>
      </Col >
      <Col span={24}>
        <Checkbox
          className="text" value="A"
          onChange={(e) => setIsAgree(e.target.checked)}
        >
          I agree to the terms and conditions
        </Checkbox>
      </Col>
      <Col span={24}>
        <ButtomCustomStyled
          htmlType="submit"
          className="submit fs-18"
          loading={loading}
          disabled={!!isAgree && !!data?.RoleID ? false : true}
          onClick={() => handleRegister()}
        >
          Sign up
        </ButtomCustomStyled>
      </Col>
    </>
  )
}

export default FormSelectRole