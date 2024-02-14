import { Button, Col, Form, Row, Select, Upload, message } from "antd"
import { useState } from "react"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import InputCustom from "src/components/FloatInput/InputCustom"
import ModalCustom from "src/components/ModalCustom"
import { BsFillTrash3Fill } from "react-icons/bs"
import ComicService from "src/services/ComicService"
import ImageService from "src/services/ImageService"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"

const { Option } = Select

const InsertUpdateComic = ({
  open,
  onCancel,
  onOk,
}) => {

  const [form] = Form.useForm()
  const global = useSelector(globalSelector)
  const [lstChapters, setLstChapters] = useState([])
  const [deleteDocs, setDeleteDocs] = useState([])
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState()

  const handleDelete = (ChapterID) => {
    const newData = lstChapters.filter(i => i?.ChapterID !== ChapterID)
    setLstChapters(newData)
  }


  const handleBeforeUpload = async (file) => {
    const isAllowedType = file.type.includes("image")
    if (!isAllowedType) {
      message.error("Yêu cầu chọn file tài liệu (doc, docx, pdf, xls, xlsx)")
    } else {
      setPreview(URL.createObjectURL(file))
    }
    return isAllowedType ? false : Upload.LIST_IGNORE
  }

  const handleInsertUpdateComic = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const resComic = await ComicService.insertComic({
        Title: values?.Title,
        ShortDecription: values?.ShortDecription,
        Genres: values?.Genres,
        Avatar: values?.image?.file,
        Author: global?.user?._id,
        Chapters: lstChapters,
        Status: true
      })
      if (resComic?.isError) return toast.error(resComic.msg)
      lstChapters.forEach(chapter => {
        values[chapter?.Name]?.fileList.forEach(async (i, index) => {
          await ImageService.insertImage({
            Chapter: chapter?.ChapterID,
            Image: i?.originFileObj,
            Comic: resComic?.data,
            SortOrder: values[`SortOrder_${chapter?.Name}`]
          })
        })
      })
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
          Đóng
        </ButtonCustom>
        <Button
          className="greendBorder small"
          onClick={() => setLstChapters([
            ...lstChapters,
            {
              ChapterID: lstChapters.length + 1,
              Name: `Chapter ${lstChapters.length + 1}`
            }
          ])}
        >
          Insert chapter
        </Button>
        <ButtonCustom
          className="small greendBackground ml-12"
          loading={loading}
          onClick={() => handleInsertUpdateComic()}
        >
          Post
        </ButtonCustom>
      </div>
    )
  }

  return (
    <ModalCustom
      open={open}
      onCancel={onCancel}
      title={open?._id ? "Chỉnh sửa truyện" : "Thêm mới truyện"}
      width="80vw"
      footer={renderFooter()}
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
                  message: "Hãy chọn avatar cho truyện",
                },
              ]}
            >
              <Upload.Dragger
                beforeUpload={file => handleBeforeUpload(file)}
                style={{ width: '100%', height: '200px' }}
                accept="image/*"
                multiple={false}
                maxCount={1}
                fileList={[]}
              >
                <div >
                  Chọn ảnh cho truyện
                </div>
                <img style={{ width: '100%', height: '180px' }} src={!!preview ? preview : open?.avatarPath} alt="" />
              </Upload.Dragger>
            </Form.Item>
          </Col>
          <Col span={19}>
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
            <Form.Item
              name="ShortDecription"
            >
              <InputCustom
                textArea
                style={{ height: '120px' }}
                label="ShortDecription"
              />
            </Form.Item>
            <Form.Item
              name="Genres"
              rules={[
                { required: true, message: "Hãy chọn thể loại truyện" },
              ]}
            >
              <Select
                isRequired
                placeholder="Genre"
                mode="multiple"
              >
                {
                  global?.genres.map(i =>
                    <Option key={i?._id} value={i?._id}>{i?.Title}</Option>
                  )
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            {
              lstChapters.map(i =>
                <Row gutter={[16]}>
                  <Col span={23} style={{ width: '100%' }}>
                    <Form.Item
                      name={i?.Name}
                      className="mb-24"
                      rules={[
                        {
                          required: form.getFieldValue("image") ? false : true,
                          message: "Hãy chọn file tải lên",
                        },
                      ]}
                    >
                      <Upload.Dragger
                        beforeUpload={file => handleBeforeUpload(file)}
                        accept="image/*"
                        className="pointer"
                        multiple="true"
                        onRemove={file => {
                          if (!!file?.ObjectFileID) {
                            setDeleteDocs([...deleteDocs, file])
                          }
                        }}
                      >
                        <div className="d-flex-center" style={{ height: '10px' }}>
                          {i?.Name}
                        </div>
                      </Upload.Dragger>
                    </Form.Item>
                  </Col>
                  <Col span={1}>
                    <ButtonCustom
                      icon={<BsFillTrash3Fill />}
                      onClick={() => handleDelete(i?.ChapterID)}
                    >
                    </ButtonCustom>
                  </Col>
                </Row>
              )
            }
          </Col>
        </Row>
      </Form>
    </ModalCustom>
  )
}

export default InsertUpdateComic