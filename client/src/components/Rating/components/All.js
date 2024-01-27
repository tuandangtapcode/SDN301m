import { useState } from "react"
import SpinCustom from "src/components/SpinCustom"

const All = () => {
  const [loading, setLoading] = useState(false)

  return (
    <SpinCustom spinning={loading}>
      All
    </SpinCustom>
  );
}

export default All;