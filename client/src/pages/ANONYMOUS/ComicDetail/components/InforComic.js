import { Col, Row } from "antd"

const InforComic = ({
  icon,
  title,
  data,
  dataRaw,
  handleNavigate
}) => {

  return (
    <Row gutter={[8]}>
      <Col span={6} className="mb-10 d-flex align-items-center" >
        <span className="mr-4 mt-4">{icon}</span>
        <span className="fs-16">{title}</span>
      </Col>
      <Col span={18} className="mb-10 cursor-pointer">
        {
          !!Array.isArray(data) ?
            <div className="d-flex f-wrap">
              {
                dataRaw?.map(i =>
                  <div
                    className="mr-8 text-blue fs-16"
                    onClick={() => handleNavigate(i?._id)}
                  >
                    {i?.Title}
                  </div>
                )
              }
            </div>
            :
            <p
              className="mr-8 text-blue fs-16"
              onClick={() => handleNavigate()}
            >
              {data}
            </p>
        }
      </Col>
    </Row>
  )
}

export default InforComic