import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import SpinCustom from "src/components/SpinCustom"
import PackageService from "src/services/PackageService"

const PremiumDetail = () => {

  const { PackageID } = useParams()
  const [loading, setLoading] = useState(false)
  const [packageDetail, setPackageDetail] = useState()
  const navigate = useNavigate()

  const getPackage = async () => {
    try {
      setLoading(true)
      const res = await PackageService.getDetailPackage(PackageID)
      if (res?.isError) return navigate('/not-found')
      setPackageDetail(res?.data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SpinCustom spinning={loading}>
      <div>
        <span>Gói của bạn</span>
        <ButtonCustom
          className="noBackground-textwhite fs-17 "
          onClick={() => navigate('/premium')}
        >
          Thay đổi gói
        </ButtonCustom>
      </div>
    </SpinCustom>
  )
}

export default PremiumDetail