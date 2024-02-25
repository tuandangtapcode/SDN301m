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

const List = ({ list, setList }) => {
  const [loading, setLoading] = useState(false)

  return (
    <SpinCustom spinning={loading}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <h2>List comic by Author:</h2>
        </Col>
        <Col span={24}>
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
            {list.length > 0 ? (
              list.map((i) => (
                <SwiperSlide
                  className="d-flex-center"
                  style={{
                    height: "200px",
                    width: "200px",
                    backgroundImage: `${i?.AvatarPath}`,
                    color: "#fff",
                  }}
                >
                  Slide 1
                </SwiperSlide>
              ))
            ) : (
              <>1111</>
            )}
          </Swiper>
        </Col>
      </Row>
    </SpinCustom>
  );
};

export default List;
