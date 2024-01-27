import { Col, Row, Space } from "antd"
import {
  AiFillFacebook,
  AiFillTwitterCircle,
  AiOutlineInstagram
} from "react-icons/ai"

const Content = ({ detail }) => {
  console.log(detail);
  return (
    <Row gutter={[16, 16]}>
      <Col span={10}>
        {detail.Avatar}
      </Col>
      <Col span={14}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <p className="title-type-1">{detail?.FullName}</p>
          </Col>
          <Col span={24}>
            {detail?.Description}
          </Col>
          <Col span={24}>
            <Space direction="horizontal">
              <AiFillFacebook style={{ fontSize: '25px', color: '#1773EA' }} />
              <AiFillTwitterCircle style={{ fontSize: '25px', color: "#4DA6E9" }} />
              <AiOutlineInstagram style={{ fontSize: '25px', color: "#E4176A" }} />
            </Space>
          </Col>
        </Row>
      </Col>
      <Col span={24}>

      </Col>
    </Row>
  );
}

export default Content;