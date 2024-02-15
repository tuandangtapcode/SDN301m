import { Col, Form, Row } from "antd"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import InputCustom from "src/components/FloatInput/InputCustom"
import ModalCustom from "src/components/ModalCustom"
import GenreService from "src/services/GenreService"

const InsertUpdateGenre = ({ open, onCancel, onOk }) => {

  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const handleInsertUpdateGenre = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = !!open?._id
        ? await GenreService.updateGenre({ ...values, id: open?._id })
        : await GenreService.insertGenre(values)
      if (res?.isError) return toast.error(res?.msg)
      onOk()
      onCancel()
    } finally {
      setLoading(false)
    }
  }

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
          onClick={() => handleInsertUpdateGenre()}
        >
          Save
        </ButtonCustom>
      </div>
    )
  }

  useEffect(() => {
    if (!!open?._id) form.setFieldsValue(open)
  }, [open])

  return (
    <ModalCustom
      open={open}
      onCancel={onCancel}
      footer={renderFooter()}
      title={!!open?._id ? "Update genre" : "Insert genre"}
      width="70vw"
    >
      <Form form={form}>
        <Row gutter={[16]}>
          <Col span={24}>
            <Form.Item
              name="Title"
              rules={[
                { required: true, message: "Hãy nhập vào tên truyện" },
              ]}
            >
              <InputCustom
                isRequired
                label="Title"
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="ShortDecription"
            >
              <InputCustom
                textArea
                style={{ height: '120px' }}
                label="ShortDecription"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ModalCustom>
  )
}

export default InsertUpdateGenre