import { Col, Row, Space } from "antd"
import List from "./List"
import LstIcons from "src/components/ListIcons"

const Content = ({ detail, setDetail, list, setList }) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={10}>
        <img
          alt="example"
          src={detail?.AvatarPath}
          style={{ maxWidth: "100%" }}
        />
      </Col>
      <Col span={14}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <p className="title-type-1">{detail?.FullName}</p>
          </Col>
          {detail?.Description &&
            <Col span={24}>
              Mô tả về tác giả:{detail?.Description}
            </Col>
          }
          <Col span={24}>
            <Space direction="horizontal">
              {LstIcons.ICON_FACEBOOK}
              {LstIcons.ICON_TWITTER}
              {LstIcons.ICON_INSTARGRAM}
            </Space>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <List list={list} setList={setList} />
      </Col>
    </Row>
  )
}

export default Content
