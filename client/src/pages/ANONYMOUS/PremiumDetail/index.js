import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import SpinCustom from "src/components/SpinCustom"
import PackageService from "src/services/PackageService"
import { PremiumDetailContainerStyled, PremiumDetailInforStyled } from "./styled"
import { formatNumberToK, randomNumber } from "src/lib/stringUtils"
import moment from "moment"
import QueryString from "qs"
import CryptoJS from "crypto-js"
import UserService from "src/services/UserService"
import { useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import { toast } from "react-toastify"
import SuccessByPremium from "./components/SuccessBuyPremium"


const listColor = [
  {
    Duration: 14,
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
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const global = useSelector(globalSelector)
  const [openSuccessBuyPremium, setOpenSuccessBuyPremium] = useState(false)

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
    let vnp_Params
    vnp_Params = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: process.env.REACT_APP_VNP_TMNCODE,
      vnp_Locale: 'vn',
      vnp_CurrCode: 'VND',
      vnp_TxnRef: randomNumber(),
      vnp_OrderInfo: `Mua premium ${packageDetail?.Title}`,
      vnp_OrderType: 'other',
      vnp_Amount: +packageDetail?.Price * 100,
      vnp_ReturnUrl: `${process.env.REACT_APP_URL_WEBSITE}/${PackageID}`,
      vnp_IpAddr: ipAddress,
      vnp_CreateDate: moment().format('YYYYMMDDHHmmss'),
    }
    vnp_Params = sortObject(vnp_Params)
    let signData = QueryString.stringify(vnp_Params, { encode: false })
    let hmac = CryptoJS.HmacSHA512(signData, process.env.REACT_APP_VNP_HASHSECRET)
    let signed = CryptoJS.enc.Hex.stringify(hmac)
    vnp_Params['vnp_SecureHash'] = signed
    const vnpURL = `${process.env.REACT_APP_VNP_URL}?${QueryString.stringify(vnp_Params, { encode: false })}`
    window.location.href = vnpURL
  }

  const sortObject = (obj) => {
    let sorted = {}
    let str = []
    let key
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key))
      }
    }
    str.sort()
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+")
    }
    return sorted
  }

  const handleBuyPremium = async () => {
    try {
      setLoading(true)
      const body = {
        EndedAt: moment().add(packageDetail?.Duration, 'days'),
        PackageID: PackageID
      }
      const res = await UserService.buyPremium(body)
      if (res?.isError) return toast.error(res?.msg)
      setOpenSuccessBuyPremium(packageDetail)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getPackage()
  }, [PackageID])

  useEffect(() => {
    if (!!queryParams.get("vnp_ResponseCode") && queryParams.get("vnp_ResponseCode") === "00" && !!packageDetail) {
      handleBuyPremium()
    }
  }, [location.search, packageDetail])

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
            onClick={() => {
              if (global?.user?.Premium?.PackageID !== packageDetail?._id) {
                handleCreatePayment()
              }
            }}
          >
            {
              global?.user?.Premium?.PackageID === packageDetail?._id
                ? "Đã mua"
                : "Thanh toán"
            }
          </ButtonCustom>
        </div>

        {
          !!openSuccessBuyPremium &&
          <SuccessByPremium
            open={openSuccessBuyPremium}
            onCancel={() => setOpenSuccessBuyPremium(false)}
          />
        }
      </PremiumDetailContainerStyled>
    </SpinCustom>
  )
}

export default PremiumDetail