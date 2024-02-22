import { useEffect, useState } from "react"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import { Dropdown } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import globalSlice from "src/redux/globalSlice"
import { AiFillBell } from "react-icons/ai"
import { BadgeStyled } from "../styled"
import LstIcons from "src/components/ListIcons"
import socket from "src/utils/socket"
import NotificationItem from "./NotificationItem"
import NotificaitonService from "src/services/NotificationService"

const DropdownProfile = () => {

  const global = useSelector(globalSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [arrowDropdownProfile, setArrowDropdownProfile] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [notifiNotSeen, setNotifiNotSeen] = useState(0)

  const handleLogout = () => {
    localStorage.removeItem('token')
    dispatch(globalSlice.actions.setUser({}))
    socket.disconnect()
    navigate('/login')
  }

  const handleSeenNotification = async () => {
    const res = await NotificaitonService.seenNotification(global?.user?._id)
    if (res?.isError) return
    setNotifiNotSeen(0)
  }

  const getNotifications = async () => {
    const res = await NotificaitonService.getListNotificationByReceiver(global?.user?._id)
    if (res?.isError) return
    setNotifications(res?.data?.List)
    setNotifiNotSeen(res?.data?.NotSeen)
  }
  useEffect(() => {
    console.log('global?.user?._id', global?.user?._id);
    if (global?.user?._id) getNotifications()
  }, [])

  const menuItems = () => {
    let items
    if (!!global?.user?.Email && !!global?.user?.Password && global?.user?.RoleID === 3) {
      items = [
        {
          label: (
            <Link to={'/profile'}>View Profile</Link>
          ),
          key: '1',
        },
        {
          label: (
            <Link to={'/mycomic'}>My comic</Link>
          ),
          key: '2',
        },
        {
          label: (
            <Link to={'/change-password'}>Change password</Link>
          ),
          key: '3',
        },
        {
          label: 'Log out',
          key: '4',
          onClick: () => handleLogout()
        },
      ]
    } else if (!!global?.user?.Email && !!global?.user?.Password && global?.user?.RoleID !== 3) {
      items = [
        {
          label: (
            <Link to={'/profile'}>View Profile</Link>
          ),
          key: '1',
        },
        {
          label: (
            <Link to={'/change-password'}>Change password</Link>
          ),
          key: '2',
        },
        {
          label: 'Log out',
          key: '3',
          onClick: () => handleLogout()
        },
      ]
    } else if (!!global?.user?.Email && !global?.user?.Password && global?.user?.RoleID !== 3) {
      items = [
        {
          label: (
            <Link to={'/profile'}>View Profile</Link>
          ),
          key: '1',
        },
        {
          label: 'Log out',
          key: '2',
          onClick: () => handleLogout()
        },
      ]
    } else if (!!global?.user?.Email && !global?.user?.Password && global?.user?.RoleID === 3) {
      items = [
        {
          label: (
            <Link to={'/profile'}>View Profile</Link>
          ),
          key: '1',
        },
        {
          label: (
            <Link to={'/mycomic'}>My comic</Link>
          ),
          key: '2',
        },
        {
          label: 'Log out',
          key: '3',
          onClick: () => handleLogout()
        },
      ]
    }
    return items
  }

  const itemsNotification = [
    {
      key: '1',
      label: (
        <div style={{ width: '300px', padding: '12px' }}>
          {
            notifications?.map(i =>
              <NotificationItem data={i} />
            )
          }
        </div>
      )
    }
  ]

  socket.on('get-notification', (data) => {
    if (global?.user?._id === data?.Receiver) {
      setNotifications([...notifications, data])
      setNotifiNotSeen(notifiNotSeen + 1)
    }
  })

  return (
    <>
      {
        !!global?.user?._id ?
          <div className="d-flex-sb">
            <ButtonCustom
              className=" noBackground-textwhite fw-600 medium fs-18"
            >
              Premium
            </ButtonCustom>
            {
              global?.user?.RoleID === 1 ?
                <ButtonCustom className="noBackground-textwhite">
                  Admintrator
                </ButtonCustom>
                :
                <Dropdown menu={{ items: menuItems() }} trigger={["click"]}>
                  <ButtonCustom
                    className=" noBackground-textwhite"
                    onClick={() => setArrowDropdownProfile(!arrowDropdownProfile)}
                    icon={arrowDropdownProfile ? LstIcons.ICON_CARET_UP : LstIcons.ICON_CARET_DOWN}
                  >
                    My Profile
                  </ButtonCustom>
                </Dropdown>
            }
            <Dropdown
              menu={{ items: itemsNotification }}
              trigger={['click']}
              onClick={() => {
                if (notifiNotSeen !== 0) {
                  handleSeenNotification()
                }
              }}
            >
              <BadgeStyled
                size="small"
                count={notifiNotSeen}
                style={{ fontSize: '10px', padding: '0px 1px 4px 0px' }}
              >
                <ButtonCustom
                  className="noBackground-textwhite"
                  icon={<AiFillBell className="fs-20" style={{ color: 'white' }} />}
                  onClick={() => setArrowDropdownProfile(false)}
                />
              </BadgeStyled>
            </Dropdown>
          </div>
          :
          <div>
            <ButtonCustom
              className="noBackground-textwhite fs-17 fw-600"
              onClick={() => navigate('/login')}
            >
              Login
            </ButtonCustom>
            <ButtonCustom
              className="noBackground-textwhite fs-17 fw-600"
              onClick={() => navigate('/signup')}
            >
              Sign up
            </ButtonCustom>
          </div>
      }
    </>
  )
}

export default DropdownProfile