import { Col, Row } from "antd";

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

          </Col>
        </Row>
      </Col>
      <Col span={24}>

      </Col>
    </Row>
  );
}

export default Content;