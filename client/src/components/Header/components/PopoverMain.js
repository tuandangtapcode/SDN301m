import { useState } from "react"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import { Dropdown } from "antd"
import { useNavigate } from "react-router-dom"
import LstIcons from "src/components/ListIcons"
import { useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"

const PopoverMain = () => {

  const [arrowDropdownMain, setArrowDropdownMain] = useState(false)
  const navigate = useNavigate()
const global = useSelector(globalSelector)


  const items = [
    {
      key: '1',
      label: (
        <div style={{ width: '600px', padding: '12px' }} className="d-flex justify-content-space-between">
          <div>
            <p className="fs-25 fw-700">Genres</p>
            <div className="d-flex-sb">
              <div className="mr-30">
                {
                  global?.genres?.slice(0, global?.genres.length * 1 / 3)?.map(i =>
                <p
                  className="fs-18 cursor-pointer"
                  onClick={() => {
                    navigate(`/genres/${i?._id}`)
                  }}
                >
                  {i?.Title}
                </p>
)
                }
              </div>
              <div>
                {
                  global?.genres?.slice(global?.genres.length * 2 / 3)?.map(i =>
                <p
                  className="fs-18 cursor-pointer"
                  onClick={() => {
                    navigate(`/genres/${i?._id}`)
                  }}
                >
                  {i?.Title}
                </p>
)
                }
              </div>
            </div>
          </div>

          <div>
            <p className="fs-25 fw-700">Resoures</p>
            <div>
              <p
                className="fs-18 cursor-pointer"
                onClick={() => {
                                    navigate('/authors')
                }}
              >
                Authors
              </p>
              <p className="fs-18 cursor-pointer">
                Languages
              </p>
              <p
                className="fs-18 cursor-pointer"
                onClick={() => {
                                    navigate('/genres')
                }}
              >
                Genres
              </p>
              <p className="fs-18 cursor-pointer">
                Articles
              </p>
              <p className="fs-18 cursor-pointer">
                Author Interviews
              </p>
              <p className="fs-18 cursor-pointer">
                Discuss
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <Dropdown
      className="mr-8"
      trigger={['click']}
      menu={{
        items
      }}
    >
      <ButtonCustom
        className="noBackground-textwhite fw-600"
        onClick={() => setArrowDropdownMain(!arrowDropdownMain)}
        icon={arrowDropdownMain ? LstIcons.ICON_CARET_DOWN : LstIcons.ICON_CARET_UP}
      >
        Khám phá
      </ButtonCustom>
    </Dropdown>
  )
}

export default PopoverMain