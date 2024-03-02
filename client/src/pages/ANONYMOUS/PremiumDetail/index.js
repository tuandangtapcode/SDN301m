import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import SpinCustom from "src/components/SpinCustom"
import PackageService from "src/services/PackageService"
import { PremiumDetailContainerStyled, PremiumDetailInforStyled } from "./styled"
import { formatNumberToK } from "src/lib/stringUtils"
import moment from "moment"
import QueryString from "qs"

const listColor = [
  {
    Duration: 1,
    Color: "rgb(207, 245, 106)"
  },
  {
    Duration: 30,
    Color: "rgb(255, 210, 215)"
  },
  {
    Duration: 60,
    Color: "rgb(196, 177, 212)"
  },
]

const PremiumDetail = () => {

  const { PackageID } = useParams()
  const [loading, setLoading] = useState(false)
  const [packageDetail, setPackageDetail] = useState()
  const [ipAddress, setIpAddress] = useState()
  const navigate = useNavigate()

  const getPackage = async () => {
    try {
      setLoading(true)
      const res = await PackageService.getDetailPackage(PackageID)
      if (res?.isError) return navigate('/not-found')
      setPackageDetail(res?.data?.PackageDetail)
      setIpAddress(res?.data?.ipAddress)
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePayment = () => {
    const vnp_params = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: process.env.REACT_APP_VNP_TMNCODE,
      vnp_Locale: 'vn',
      vnp_CurrCode: 'VNĐ',
      vnp_TxnRef: 0,
      vnp_OrderInfo: `Mua premium ${packageDetail?.Title}`,
      vnp_Amount: +packageDetail?.Price,
      vnp_ReturnUrl: process.env.REACT_APP_URL_WEBSITE,
      vnp_IpAddr: ipAddress,
      vnp_CreateDate: moment().format('YYYYMMDDHHmmss'),
      vnp_SecureHash: process.env.REACT_APP_VNP_HASHSECRET
    }
    const params = QueryString.stringify(vnp_params)
    const vnpURL = `${process.env.REACT_APP_VNP_URL}?${params}`
    window.location.href = vnpURL
  }

  useEffect(() => {
    getPackage()
  }, [PackageID])

  return (
    <SpinCustom spinning={loading}>
      <PremiumDetailContainerStyled>
        <div className="d-flex-sb mb-16">
          <span className="fs-25 fw-700">Gói của bạn</span>
          <ButtonCustom
            className="normal fs-15"
            onClick={() => navigate('/premium')}
          >
            Thay đổi gói
          </ButtonCustom>
        </div>
        <PremiumDetailInforStyled
          style={{
            backgroundColor: listColor?.find(i => i?.Duration === packageDetail?.Duration)?.Color,
          }}
        >
          <div className="d-flex-sb mt-12 mb-15">
            <span className="fw-600">Premium {packageDetail?.Title}</span>
            <span className="fw-600">{formatNumberToK(packageDetail?.Price)}</span>
          </div>
          <div className="d-flex-sb mb-12">
            <span className="fw-600">Bắt đầu từ hôm nay</span>
            <span className="fw-600">Kết thúc vào {moment().add(packageDetail?.Duration, 'days').format("DD/MM/YYYY")}</span>
          </div>
        </PremiumDetailInforStyled>
        <div className="d-flex-center mt-15">
          <ButtonCustom
            className="greendBackground medium"
            onClick={() => handleCreatePayment()}
          >
            Thanh toán
          </ButtonCustom>
        </div>
      </PremiumDetailContainerStyled>
    </SpinCustom>
  )
}

export default PremiumDetail