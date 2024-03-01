import { Form } from "antd"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import InputCustom from "src/components/FloatInput/InputCustom"
import ModalCustom from "src/components/ModalCustom"
import { getRegexNumber } from "src/lib/stringUtils"
import PackageService from "src/services/PackageService"

const InsertUpdatePackage = ({ open, onCancel, onOk }) => {

  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleInsertUpdatepPackage = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = !!open?._id
        ? await PackageService.updatePackage({ ...values, id: open?._id })
        : await PackageService.insertPackage(values)
      if (res?.isError) return toast.error(res?.msg)
      onOk()
      onCancel()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (open?._id)
      form.setFieldsValue(open)
  }, [open])

  const renderFooter = () => {
    return (
      <div className="d-flex-end">
        <ButtonCustom
          className="normal"
          onClick={() => onCancel()}
        >
          Cancel
        </ButtonCustom>
        <ButtonCustom
          className="small greendBackground ml-12"
          loading={loading}
          onClick={() => handleInsertUpdatepPackage()}
        >
          Save
        </ButtonCustom>
      </div>
    )
  }

  return (
    <ModalCustom
      open={open}
      onCancel={onCancel}
      title={open?._id ? "Cập nhật gói premium" : "Thêm gói premium"}
      width="80vw"
      footer={renderFooter()}
    >
      <Form form={form}>
        <Form.Item
          name="Title"
          rules={[
            { required: true, message: "Hãy nhập tiêu đề cho gói" }
          ]}
        >
          <InputCustom label="Title" />
        </Form.Item>
        <Form.Item
          name="Description"
          rules={[
            { required: true, message: "Hãy mô tả cho gói" }
          ]}
        >
          <InputCustom style={{ height: '120px' }} textArea label="Description" />
        </Form.Item>
        <Form.Item
          name="Price"
          rules={[
            { required: true, message: "Hãy nhập giá của gói" },
            { pattern: getRegexNumber(), message: "Nhập sai format số" }
          ]}
        >
          <InputCustom label="Price" />
        </Form.Item>
        <Form.Item
          name="Duration"
          rules={[
            { required: true, message: "Hãy nhập thời hạn sử dụng gói" },
            { pattern: getRegexNumber(), message: "Nhập sai format số" }
          ]}
        >
          <InputCustom label="Duration(ngày)  " />
        </Form.Item>
      </Form>
    </ModalCustom >
  )
}

export default InsertUpdatePackage