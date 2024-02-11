import { Col, Form, Row, Upload, message } from "antd"
import { useEffect, useState } from "react"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import ModalCustom from "src/components/ModalCustom"
import { ImageStyled } from "../styled"
import { useDispatch, useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import InputCustom from "src/components/FloatInput/InputCustom"
import UserService from "src/services/UserService"
import { toast } from "react-toastify"
import globalSlice from "src/redux/globalSlice"

const UpdateProfile = ({ open, onCancel }) => {

  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const global = useSelector(globalSelector)
  const [preview, setPreview] = useState()
  const [loading, setLoading] = useState()

  const handleBeforeUpload = (file) => {
    const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"]
    const isAllowedType = allowedImageTypes.includes(file.type)
    if (!isAllowedType) {
      message.error("Yêu cầu chọn file ảnh (jpg, png, gif)")
    } else {
      setPreview(URL.createObjectURL(file))
    }
    return isAllowedType ? false : Upload.LIST_IGNORE
  }

  const handleUpdateProfile = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const { image, ...remainValues } = values
      const res = await UserService.updateProfile({ ...remainValues, Avatar: values?.image?.file, UserID: global?.user?._id })
      if (res?.isError) return toast.error(res?.msg)
      dispatch(globalSlice.actions.setUser(res?.data))
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
          Đóng
        </ButtonCustom>
        <ButtonCustom
          className="small greendBackground ml-12"
          loading={loading}
          onClick={() => handleUpdateProfile()}
        >
          Update
        </ButtonCustom>
      </div>
    )
  }

  useEffect(() => {
    if (!!global?.user?._id) form.setFieldsValue(global?.user)
  }, [global?.user])

  return (
    <ModalCustom
      open={open}
      onCancel={onCancel}
      title="Update profile"
      footer={renderFooter()}
      width="70vw"
    >
      <Form form={form}>
        <Row gutter={[16, 0]}>
          <Col span={5}>
            <Form.Item
              name='image'
              className="mb-24"
              rules={[
                {
                  required: form.getFieldValue("image") ? false : true,
                  message: "Please choose your avatar",
                },
              ]}
            >
              <Upload.Dragger
                beforeUpload={file => handleBeforeUpload(file)}
                style={{ width: '100%', height: '150px' }}
                accept="image/*"
                multiple={false}
                maxCount={1}
                fileList={[]}
              >
                <div >
                  Choose your avatar
                </div>
                <ImageStyled src={!!preview ? preview : global?.user?.AvatarPath} alt="" />
              </Upload.Dragger>
            </Form.Item>
          </Col>
          <Col span={19}>
            <Form.Item
              name="FullName"
              rules={[
                { required: true, message: "Hãy nhập vào tên truyện" },
              ]}
            >
              <InputCustom
                isRequired
                label="FullName"
              />
            </Form.Item>
            <Form.Item
              name="Description"
            >
              <InputCustom
                textArea
                style={{ height: '150px' }}
                label="Description"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ModalCustom>
  )
}

export default UpdateProfile