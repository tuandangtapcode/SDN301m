import { Form, Radio, Space } from "antd"
import { useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import ModalCustom from "src/components/ModalCustom"
import { listRegulations } from "src/lib/constant"
import { globalSelector } from "src/redux/selector"
import NotificaitonService from "src/services/NotificationService"
import socket from "src/utils/socket"


const ModalReport = ({ open, onCancel }) => {

  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const global = useSelector(globalSelector)


  const handleSubmit = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const body = {
        Content: `${global?.user?.FullName} báo cáo truyện ${open?.Title}: ${listRegulations?.find(i => i?.ID === +values?.RegulationsID)?.Content}`,
        Sender: global?.user?._id
      }
      const resNoti = await NotificaitonService.createNotification(body)
      if (resNoti?.isError) return
      socket.emit('send-notification', { Content: body.Content, Receiver: resNoti?.data?.Receiver, IsSeen: false })
      toast.success("Nội dung báo cáo đã được gửi. Cảm ơn vì đóng góp của bạn")
      onCancel()
    } finally {
      setLoading(false)
    }
  }

  const renderFooter = () => (
    <Space size={8} className="d-flex-end">
      <ButtonCustom
        className="small greendBackground ml-12"
        loading={loading}
        onClick={() => handleSubmit()}
      >
        Gửi
      </ButtonCustom>
      <ButtonCustom
        className="normal"
        onClick={onCancel}
      >
        Đóng
      </ButtonCustom>
    </Space>
  )

  return (
    <ModalCustom
      title={open.title}
      width={700}
      open={open}
      onCancel={onCancel}
      footer={renderFooter()}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{}}

      >
        <Form.Item
          label="Nội dung báo cáo:"
          name="RegulationsID"
          rules={[
            {
              required: true,
              message: "Nội dung báo cáo không được để trống!",
            },
          ]}
        >
          <Radio.Group>
            {
              listRegulations?.map(i =>
                <Radio key={i?.ID} value={i?.ID}>{i?.Content}</Radio>
              )
            }
          </Radio.Group>
        </Form.Item>



      </Form>
    </ModalCustom>
  )
}

export default ModalReport