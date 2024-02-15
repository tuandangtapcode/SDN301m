import { useState } from "react"
import ButtonCustom from "src/components/ButtonCustom/MyButton"

const MyComic = () => {

  const [insertUpdateComic, setInsertUpdateComic] = useState()

  return (
    <div className="mt-15 mb-15">
      <ButtonCustom
        className="greendBackground medium"
        onClick={() => setInsertUpdateComic(true)}
      >
        Create new comic
      </ButtonCustom>
    </div>
  )
}

export default MyComic