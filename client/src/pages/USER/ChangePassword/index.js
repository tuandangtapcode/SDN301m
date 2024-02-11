import { Col, Form, Row } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { ButtomCustomStyled } from "src/components/ButtonCustom/MyButton/styled"
import InputCustom from "src/components/FloatInput/InputCustom"
import { globalSelector } from "src/redux/selector"
import UserService from "src/services/UserService"
import styled from "styled-components"

const ChangePasswordStyled = styled.div`
max-width: 40%;
margin: auto;
`

const ChangePassword = () => {

  const [form] = Form.useForm()
  const global = useSelector(globalSelector)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleChangePassword = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      if (values?.NewPassword !== values?.ConfirmPassword) return toast.error("Confirm password is not the same as new password")
      const res = await UserService.changePassword({ ...values, UserID: global?.user?._id })
      if (res?.isError) return toast.error(res?.msg)
      toast.success(res?.msg)
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!!global?.user?.Email && !global?.user?.Password) navigate('/')
  }, [global?.user])

  return (
    <ChangePasswordStyled>
      <Form form={form}>
        <Row gutter={[16, 0]}>
          <Col span={24}>
            <div className="text-center mb-20 mt-35">
              <p className="fs-25 fw-600">Change your password</p>
            </div>
          </Col>
          <Col span={24}>
            <Form.Item
              name="OldPassword"
              rules={[
                { required: true, message: "Please enter old pasword" },
              ]}
            >
              <InputCustom
                isPass
                isRequired
                label="Old password"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="NewPassword"
              rules={[
                { required: true, message: "Please enter new pasword" },
              ]}
            >
              <InputCustom
                isPass
                isRequired
                label="New password"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="ConfirmPassword"
              rules={[
                { required: true, message: "Please enter confirm pasword" },
              ]}
            >
              <InputCustom
                isPass
                isRequired
                label="Confirm password"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <ButtomCustomStyled
              className="submit fw-600 fs-18 mb-35"
              loading={loading}
              onClick={() => handleChangePassword()}
            >
              Save
            </ButtomCustomStyled>
          </Col>
        </Row>
      </Form>
    </ChangePasswordStyled>
  )
}

export default ChangePassword