import {
  AiFillEdit,
  AiFillHeart,
  AiOutlineBarChart,
  AiFillBell,
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillEye
} from "react-icons/ai"
import { BsFillTrash3Fill } from "react-icons/bs"
import {
  TbLock,
  TbLockOpen,
  TbCategoryFilled
} from "react-icons/tb"
import {
  FaUsers,
  FaBookReader
} from "react-icons/fa"
import { BiLogIn } from "react-icons/bi"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ExceptionOutlined,
  SearchOutlined,
  CloseOutlined,
  CaretUpOutlined,
  CaretDownOutlined
} from "@ant-design/icons"
import { CgSandClock } from "react-icons/cg"

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
  ICON_CONFIRM: <AiFillCheckCircle className="fs-18 active-green" />,
  ICON_CLOSE_RED: <AiFillCloseCircle className="fs-18 text-red" />,
  ICON_LOGOUT: <BiLogIn className="fs-20" />,
  ICON_MENUFOLD: <MenuFoldOutlined />,
  ICON_MENUUNFOLD: <MenuUnfoldOutlined />,
  ICON_PREVIEW: <AiFillEye className="fs-20" />,
  ICON_REPORT: <ExceptionOutlined />,
  ICON_PENDING_CONFIRM: <CgSandClock style={{ color: "#01638D", fontSize: '20px' }} />,
  ICON_EYE: <AiFillEye className="fs-15 mr-4 text-white" />,
  ICON_LIKE: <AiFillHeart className="fs-15 mr-4 text-white" />
}

export default LstIcons