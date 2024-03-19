import { Form, Row, Steps } from "antd"
import { useEffect, useState } from "react"
import styled from "styled-components"
import Result from "./components/Result"
import { useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import { useNavigate } from "react-router-dom"
import FormEmail from "./components/FormEmail"
import UserService from "src/services/UserService"
import { toast } from "react-toastify"

const ForgotPasswordContainer = styled.div`
width: 40%;
margin: auto;
.ant-steps {
  width: 600px !important;
  margin: auto !important;
}
.ant-steps-icon-dot {
  display: none;
}
.ant-steps-item {
  flex: 1;
  margin: 0 !important;
  padding: 0 !important;
}
.ant-steps-item-last {
  flex: none;
}
.ant-steps .ant-steps-item-finish>.ant-steps-item-container>.ant-steps-item-tail::after {
  background-color: transparent !important;
} 
.ant-steps.ant-steps-dot .ant-steps-item-tail::after, .ant-steps.ant-steps-dot.ant-steps-small .ant-steps-item-tail::after {
  width: 100% !important;
}
`

const ForgotPassword = () => {

  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const global = useSelector(globalSelector)
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)

  const handleSendMail = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await UserService.checkEmail(values)
      if (res?.isError) return toast.error(res?.msg)
      localStorage.setItem('usid', res?.data)
      setCurrent(1)
    } finally {
      setLoading(false)
    }
  }

  const steps = [
    {
      title: "Input email",
      content: <FormEmail
        loading={loading}
        handleSendMail={handleSendMail}
      />
    },
    {
      title: "Result",
      content: <Result />
    }
  ]

  const items = steps.map((item) => ({
    key: item.title,
  }))

  useEffect(() => {
    if (!!global?.user?._id) navigate('/')
  }, [])

  return (
    <ForgotPasswordContainer>
      <Steps
        current={current}
        items={items}
        progressDot={true}
      />
      <Form form={form}>
        <Row>
          {steps[current].content}
        </Row>
      </Form>
    </ForgotPasswordContainer>
  )
}

export default ForgotPassword