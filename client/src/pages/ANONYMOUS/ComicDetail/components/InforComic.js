import { Col, Row } from "antd"

const InforComic = ({ icon, title, data }) => {

  return (
    <Row gutter={[8]}>
      <Col span={6} className="mb-10 d-flex align-items-center" >
        <span className="mr-4 mt-4">{icon}</span>
        <span className="fs-16">{title}</span>
      </Col>
      <Col span={18} className="mb-10">
        {
          !!Array.isArray(data) ?
            <div className="d-flex f-wrap">
              {
                data?.map(i =>
                  <div className="mr-8 text-blue fs-16">{i}</div>
                )
              }
            </div>
            :
            <p className="mr-8 text-blue fs-16">{data}</p>
        }
      </Col>
    </Row>
  )
}

export default InforComic