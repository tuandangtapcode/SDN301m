import { Col, Row } from "antd";
import { useState } from "react";
import LstIcons from "src/components/ListIcons";
import SpinCustom from "src/components/SpinCustom";

const data = [
  {
    stt: 1,
    name: "Võ luyện đỉnh phong",
    urlImage:
      "https://st.nettruyenbb.com/data/comics/32/vo-luyen-dinh-phong-9068.jpg",
    chapter: "Chapter 3689",
    view: "26M",
  },
  {
    stt: 2,
    name: "Võ luyện đỉnh phong",
    urlImage:
      "https://st.nettruyenbb.com/data/comics/32/vo-luyen-dinh-phong-9068.jpg",
    chapter: "Chapter 3689",
    view: "26M",
  },
  {
    stt: 3,
    name: "Võ luyện đỉnh phong",
    urlImage:
      "https://st.nettruyenbb.com/data/comics/32/vo-luyen-dinh-phong-9068.jpg",
    chapter: "Chapter 3689",
    view: "26M",
  },
  {
    stt: 4,
    name: "Võ luyện đỉnh phong",
    urlImage:
      "https://st.nettruyenbb.com/data/comics/32/vo-luyen-dinh-phong-9068.jpg",
    chapter: "Chapter 3689",
    view: "26M",
  },
  {
    stt: 5,
    name: "Võ luyện đỉnh phong",
    urlImage:
      "https://st.nettruyenbb.com/data/comics/32/vo-luyen-dinh-phong-9068.jpg",
    chapter: "Chapter 3689",
    view: "26M",
  },
];

const All = () => {
  const [loading, setLoading] = useState(false);

  return (
    <SpinCustom spinning={loading}>
      {data.map((d) => (
        <Row
          gutter={[16, 16]}
          className="p-10"
          style={{
            border: "1px solid #ff5079",
            borderTop: "none",
            borderRadius: "10px",
          }}
        >
          <Col span={4} className="d-flex-center fw-600 fs-18">
            {d.stt}
          </Col>
          <Col span={4}>
            <img
              src={d.urlImage}
              alt=" "
              style={{ width: "55px", height: "55px" }}
            />
          </Col>
          <Col span={16}>
            <p className="fs-18 fw-600 ml-5">{d.name}</p>
            <div className="d-flex-sb">
              <p className="fs-13 fw-300 ml-5">{d.chapter}</p>
              <p className="fs-13 fw-300 ml-5">
                <span>{LstIcons?.ICON_PREVIEW}</span>
                <span>{d.view}</span>
              </p>
            </div>
          </Col>
        </Row>
      ))}
    </SpinCustom>
  );
};

export default All;
