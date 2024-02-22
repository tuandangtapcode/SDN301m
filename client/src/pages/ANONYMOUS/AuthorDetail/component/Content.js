import { Col, Row, Space } from "antd";
import {
  AiFillFacebook,
  AiFillTwitterCircle,
  AiOutlineInstagram,
} from "react-icons/ai";
import List from "./List";

const Content = ({ detail, setDetail }) => {
  console.log(detail);
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
              <AiFillFacebook style={{ fontSize: "25px", color: "#1773EA" }} />
              <AiFillTwitterCircle
                style={{ fontSize: "25px", color: "#4DA6E9" }}
              />
              <AiOutlineInstagram
                style={{ fontSize: "25px", color: "#E4176A" }}
              />
            </Space>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <List />
      </Col>
    </Row>
  );
};

export default Content;
