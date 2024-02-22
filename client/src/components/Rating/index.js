import { Col, Row, Tabs } from "antd";
import { useState } from "react";
import { PageStyles } from "./style";
import All from "./components/All";
import Month from "./components/Month";
import Week from "./components/Week";
import SpinCustom from "../SpinCustom";

const Rating = () => {
  const [loading, setLoading] = useState(false);
  const [activeKey, setActiveKey] = useState(1);

  const items = [
    {
      key: "1",
      label: `All`,
      children: <All />,
    },
    {
      key: "2",
      label: `Top month`,
      children: <Month activeKey={activeKey} />,
    },
    {
      key: "3",
      label: `Top week`,
      children: <Week activeKey={activeKey} />,
    },
  ];

  return (
    <SpinCustom spinning={loading}>
      <Row
      // style={{ border: "1px solid #ff5079", borderRadius: "8px" }}
      >
        <Col span={24} className="d-flex">
          <PageStyles>
            <Tabs
              defaultActiveKey="1"
              items={items}
              onChange={(key) => {
                setActiveKey(key);
              }}
              type="card"
            />
          </PageStyles>
        </Col>
      </Row>
    </SpinCustom>
  );
};

export default Rating;
