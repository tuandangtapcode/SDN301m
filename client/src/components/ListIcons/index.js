import { AiFillEdit } from "react-icons/ai"
import { BsFillTrash3Fill } from "react-icons/bs"
import { AiFillBell, AiFillCheckCircle } from "react-icons/ai"
import { SearchOutlined, CloseOutlined } from '@ant-design/icons'
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import { TbLock, TbLockOpen, TbCategoryFilled } from "react-icons/tb"
import { AiOutlineBarChart } from "react-icons/ai"
import { FaUsers, FaBookReader } from "react-icons/fa"
import { BiLogIn } from "react-icons/bi"
import { MenuFoldOutlined, MenuUnfoldOutlined, ExceptionOutlined } from "@ant-design/icons"

const LstIcons = {
  ICON_EDIt: <AiFillEdit className="text-green fs-18" />,
  ICON_DELETE: <BsFillTrash3Fill className="text-red fs-18" />,
  ICON_BELL: <AiFillBell className="fs-20" style={{ color: 'white' }} />,
  ICON_SEARCH: <SearchOutlined className="text" />,
  ICON_CLOSE: <CloseOutlined className="text" />,
  ICON_CARET_UP: <CaretUpOutlined />,
  ICON_CARET_DOWN: <CaretDownOutlined />,
  ICON_BLOCK: <TbLock className="fs-18" />,
  ICON_UNBLOCK: <TbLockOpen className="fs-18" />,
  ICON_STATISTIC: <AiOutlineBarChart className="fs-18" />,
  ICON_USER: <FaUsers className="fs-18" />,
  ICON_GENRES: <TbCategoryFilled className="fs-18" />,
  ICON_COMIC: <FaBookReader className="fs-18" />,
  ICON_CONFIRM: <AiFillCheckCircle className="fs-18" />,
  ICON_LOGOUT: <BiLogIn className="fs-20" />,
  ICON_MENUFOLD: <MenuFoldOutlined />,
  ICON_MENUUNFOLD: <MenuUnfoldOutlined />,
  ICON_REPORT: <ExceptionOutlined />,
}

export default LstIcons