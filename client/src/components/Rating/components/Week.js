import { useState } from "react"
import SpinCustom from "src/components/SpinCustom"

const Week = () => {
  const [loading, setLoading] = useState(false)

  return (
    <SpinCustom spinning={loading}>
      Week
    </SpinCustom>
  )
}

export default Week