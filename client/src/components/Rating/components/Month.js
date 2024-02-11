import { useState } from "react"
import SpinCustom from "src/components/SpinCustom"

const Month = () => {
  const [loading, setLoading] = useState(false)

  return (
    <SpinCustom spinning={loading}>
      Month
    </SpinCustom>
  )
}

export default Month