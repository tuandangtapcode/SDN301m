import { Button, Col, Row } from "antd"
import { useEffect, useState } from "react"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import LstIcons from "src/components/ListIcons"
import SpinCustom from "src/components/SpinCustom"
import PackageService from "src/services/PackageService"
import PremiumItem from "./components/PremiumItem"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import ConfirmModal from "src/components/ModalCustom/ConfirmModal"

const listColor = [
  "rgb(207, 245, 106)",
  "rgb(255, 210, 215)",
  "rgb(196, 177, 212)"
]

const Premium = () => {

  const [loading, setLoading] = useState(false)
  const [packages, setPackages] = useState()
  const navigate = useNavigate()
  const global = useSelector(globalSelector)

  const getPackages = async () => {
    try {
      setLoading(true)
      const res = await PackageService.getAllPackages({})
      if (res?.isError) return
      setPackages(res?.data?.List)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getPackages()
  }, [])

  return (
    <SpinCustom spinning={loading}>
      <div className="mb-20 mt-40">
        <div className="fs-20 fw-600 mb-10 text-matte">
          Đọc truyện không giới hạn. Dùng thử gói Golden Premium trong 1 tháng với giá 29.5000đ
        </div>
        <div className="fw-600 fs-14 mb-30 text-matte">
          Hủy bất cứ lúc nào
        </div>
        <div>
          <ButtonCustom
            className="small greendBackground mr-12 text-matte"
            onClick={() => {
              if (!global?.user?._id) {
                ConfirmModal({
                  title: `Hãy đăng nhập để có thể mua premium`,
                  okText: "Đăng nhập",
                  cancelText: "Hủy",
                  onOk: async close => {
                    navigate('/login')
                    close()
                  },
                })
              } else {
                navigate(`/premium/${packages[1]?._id}`)
              }
            }}
          >
            Mua {!!packages?.length && packages[1]?.Title}
          </ButtonCustom>
        </div>
        <div style={{ width: '50%' }} className="m-auto text-center mb-30 ">
          <div className="fw-600 fs-25 mb-12 text-matte">
            Trải nghiệm sự khác biệt
          </div>
          <div className="fs-18 text-matte">
            Dùng Premium để nắm toàn quyền kiểm soát trải nghiệm đọc truyện. Hủy bất cứ lúc nào.
          </div>
        </div>

        <div style={{ width: '75%' }} className="m-auto text-center text-matte mb-30">
          <div className="d-flex-sb">
            <div className="fs-20 fw-600">
              Lợi ích của tất cả các gói Premium
            </div>
            <div>
              <div>
                <span>{LstIcons.ICON_CHECK}</span>
                <span>Đọc không giới hạn số lượng chương</span>
              </div>
              <div>
                <span>{LstIcons.ICON_CHECK}</span>
                <span>Tận hưởng trải nghiệm đọc không có quảng cáo phiền toái</span>
              </div>
              <div>
                <span>{LstIcons.ICON_CHECK}</span>
                <span>Khám phá nhiều thể loại và trải nghiệm mọi chi tiết hấp dẫn của câu chuyện mà bạn yêu thích.</span>
              </div>
            </div>
          </div>
        </div>

        <Row gutter={[16]}>
          {
            packages?.map((i, idx) =>
              <Col span={8}>
                <PremiumItem premium={i} color={listColor[idx]} />
              </Col>
            )
          }
        </Row>
      </div>
    </SpinCustom>
  )
}

export default Premium
