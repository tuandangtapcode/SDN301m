import { Button, Form, Input, Space } from "antd"
import { useEffect, useState } from "react"
import ModalCustom from "src/components/ModalCustom"


const ModalReport = ({ open, onCancel }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)


  const handleSubmit = async (isSubmit, allValues) => {
    try {
      // const res = await FeeService.tinhPhiBoSungDonVBBH(body)
    } finally {
      setLoading(false)
    }
  }

  const renderFooter = () => (
    <Space size={8} className="d-flex-center">
      <Button
        className="greendBackground medium text-white fs-17"
        onClick={() => handleSubmit()}
      >
        Xác nhận
      </Button>
      <Button
        className="medium fs-17 mr-20"
        onClick={onCancel}
      >
        Đóng
      </Button>
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
          name="SoYCBH"
          rules={[
            {
              required: true,
              message: "Nội dung báo cáo không được để trống!",
            },
          ]}
        >
          <Input.TextArea placeholder="Nhập" />
        </Form.Item>



      </Form>
    </ModalCustom>
  )
}

export default ModalReport