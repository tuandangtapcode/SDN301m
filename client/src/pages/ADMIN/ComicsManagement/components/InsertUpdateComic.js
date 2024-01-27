import { Col, Form, Row, Select } from "antd"
import { useState } from "react"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import InputCustom from "src/components/FloatInput/InputCustom"
import ModalCustom from "src/components/ModalCustom"
import { BsFillTrash3Fill } from "react-icons/bs"

const { Option } = Select

const InsertUpdateComic = ({
  open,
  onCancel,
  onOk,
  genres
}) => {

  const [form] = Form.useForm()
  const [lstChapters, setLstChapters] = useState([])

  const renderFooter = () => {
    return (
      <div>
        <ButtonCustom
          className="normal"
          onClick={() => onCancel()}
        >
          Đóng
        </ButtonCustom>
        <ButtonCustom
          onClick={() => setLstChapters([
            ...lstChapters,
            {
              ChapterID: lstChapters.length + 1,
              Name: `Chapter ${lstChapters.length + 1}`
            }
          ])}
        >
          Insert chapter
        </ButtonCustom>
        <ButtonCustom
        // onClick={() => onCancel()}
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
      width="50vw"
      footer={renderFooter()}
    >
      <Form form={form}>
        <Row>
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
                label="ShortDecription"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="Genres"
            >
              <Select
                placeholder="Genre"
                mode="multiple"
              >
                {
                  genres.map(i =>
                    <Option key={i?._id} value={i?._id}>{i?.Title}</Option>
                  )
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            {
              lstChapters.map(i =>
                <Row gutter={12} className="d-flex-sb">
                  <Col span={23} style={{ width: '100%' }}>
                    <InputCustom
                      style={{ width: '100%' }}
                      label="ShortDecription"
                    />
                  </Col>
                  <Col span={1}>
                    <ButtonCustom
                      icon={<BsFillTrash3Fill />}
                    // onClick={() => }
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
  );
}

export default InsertUpdateComic;