import { useState } from "react"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import { Badge, Dropdown } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import globalSlice from "src/redux/globalSlice"
import { AiFillBell } from "react-icons/ai"
import { BadgeStyled } from "../styled"

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

  const items = [
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
                  className="noBackground"
                  icon={<AiFillBell className="fs-20" style={{ color: 'white' }} />}
                  onClick={() => setArrowDropdownProfile(false)}
                />
              </BadgeStyled>
            </Dropdown>

            <Dropdown menu={{ items }} open={arrowDropdownProfile}>
              <ButtonCustom
                className="normal noBackground"
                icon={arrowDropdownProfile ? <CaretUpOutlined /> : <CaretDownOutlined />}
                onMouseOver={() => setArrowDropdownProfile(true)}
                onMouseOut={() => setArrowDropdownProfile(false)}
              >
                My Profile
              </ButtonCustom>
            </Dropdown>
          </div>
          :
          <div>
            <ButtonCustom
              className="noBackground fs-17 fw-600"
              onClick={() => navigate('/login')}
            >
              Login
            </ButtonCustom>
            <ButtonCustom
              className="noBackground fs-17 fw-600"
              onClick={() => navigate('/signup')}
            >
              Sign up
            </ButtonCustom>
          </div>
      }
    </>
  );
}

export default DropdownProfile;