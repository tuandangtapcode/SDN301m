import { AiFillEdit } from "react-icons/ai"
import { BsFillTrash3Fill } from "react-icons/bs"
import { BsBan } from "react-icons/bs"
import { AiFillBell } from "react-icons/ai"
import { SearchOutlined, CloseOutlined } from '@ant-design/icons'
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'

const LstIcons = {
  ICON_EDIt: <AiFillEdit className="text-green fs-18" />,
  ICON_DELETE: <BsFillTrash3Fill className="text-red fs-18" />,
  ICON_BAN: <BsBan className="text-red" />,
  ICON_BELL: <AiFillBell className="fs-20" style={{ color: 'white' }} />,
  ICON_SEARCH: <SearchOutlined className="text" />,
  ICON_CLOSE: <CloseOutlined className="text" />,
  ICON_CARET_UP: <CaretUpOutlined />,
  ICON_CARET_DOWN: <CaretDownOutlined />
}

export default LstIcons