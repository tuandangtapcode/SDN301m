import { Col, Row } from "antd"
import { useState } from "react"
import SpinCustom from "src/components/SpinCustom"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import { useNavigate } from "react-router-dom"

const List = ({ list, setList }) => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  return (
    <SpinCustom spinning={loading}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <h2>Danh sách truyện của tác giả:</h2>
        </Col>
        <Col span={24} className="mt-20">
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {list?.map((i) => (
              <SwiperSlide
                className="d-flex-center"
              >
                <div onClick={() => navigate(`/comic/${i?._id}`)}>
                  <img src={`${i?.AvatarPath}`} style={{ width: '200px', height: '200px' }} alt="" />
                  <h4 className="d-flex-center">{i?.Title}</h4>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Col>
      </Row>
    </SpinCustom>
  )
}

export default List
