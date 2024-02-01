import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ModalCustom from "src/components/ModalCustom";
import SpinCustom from "src/components/SpinCustom";
import GenreService from "src/services/GenreService";

const ModalGenres = ({ open, onCancel, onOk }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!!open?._id) form.setFieldsValue(open)
  }, [open])

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const values = !!open?._id
        ? await form.getFieldValue()
        : await form.validateFields()
      const res = !!open?._id
        ? await GenreService.updateGenre(values)
        : await GenreService.insertGenre(values)
      if (res?.isError) return
      onCancel()
      toast.success(`${!!open?._id ? "Update" : "Add"} successfully`)
      onOk()
    } finally {
      setLoading(false)
    }
  }

  const renderFooter = () => (
    <div className="d-flex-center">
      <Button
        btnType="primary"
        onClick={() => {
          handleSubmit()
        }}
      >
        Submit
      </Button>
      <Button btnType="third" onClick={onCancel}>
        Cancel
      </Button>
    </div>
  )

  return (
    <ModalCustom
      title={!open?._id ? "Add new genres" : "Update genres"}
      width={700}
      open={open}
      onCancel={onCancel}
      footer={renderFooter()}
    >
      <SpinCustom spinning={loading}>
        <Form form={form} layout="vertical" initialValues={{}}>
          <Form.Item
            name="Title"
            label="Genres Name:"
            required
            rules={[
              {
                required: true,
                message: 'Please input Genres Name!',
              },
            ]}
          >
            <Input placeholder="Nhập" />
          </Form.Item>
          <Form.Item
            name="ShortDecription"
            label="Short Decription:"
          >
            <Input.TextArea placeholder="Nhập" />
          </Form.Item>
        </Form>
      </SpinCustom>
    </ModalCustom>
  )
}

export default ModalGenres;