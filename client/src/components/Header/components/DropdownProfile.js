import { useState } from "react"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import { Dropdown } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import globalSlice from "src/redux/globalSlice"
import { AiFillBell } from "react-icons/ai"
import { BadgeStyled } from "../styled"
import LstIcons from "src/components/ListIcons"

const DropdownProfile = () => {

  const global = useSelector(globalSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [arrowDropdownProfile, setArrowDropdownProfile] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    dispatch(globalSlice.actions.setUser({}))
    navigate('/login')
  }

  const items = !!global?.user?.Email && !!global?.user?.Password ?
    [
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
        key: '4',
      },
      {
        label: 'Log out',
        key: '5',
        onClick: () => handleLogout()
      },
    ]
    :
    [
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
        key: '5',
        onClick: () => handleLogout()
      },
    ]

  return (
    <>
      {
        !!global?.user?._id ?
          <div className="d-flex-sb">
            <Dropdown menu={{ items }} trigger={['click']}>
              <BadgeStyled
                size="small"
                count={5}
                style={{ fontSize: '10px', padding: '0px 1px 4px 0px' }}
              >
                <ButtonCustom
                  className="noBackground-textwhite"
                  icon={<AiFillBell className="fs-20" style={{ color: 'white' }} />}
                  onClick={() => setArrowDropdownProfile(false)}
                />
              </BadgeStyled>
            </Dropdown>

            <Dropdown menu={{ items }} trigger={["click"]}>
              <ButtonCustom
                className=" noBackground-textwhite"
                icon={arrowDropdownProfile ? LstIcons.ICON_CARET_UP : LstIcons.ICON_CARET_DOWN}
              >
                My Profile
              </ButtonCustom>
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