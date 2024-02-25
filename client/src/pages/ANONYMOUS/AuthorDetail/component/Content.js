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
          <Col span={24}>
            Description Author: ...
            {detail?.Description}
          </Col>
          <Col span={24}>Status: ...</Col>
          <Col span={24}>Sex: ...</Col>
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
  );
};

export default Content;
