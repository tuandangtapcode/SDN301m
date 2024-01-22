import { useState } from "react"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import { Dropdown } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import globalSlice from "src/redux/globalSlice"

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
      label: 'Log out',
      key: '3',
      onClick: () => handleLogout()
    },
  ];

  return (
    <>
      {
        !!global?.user?._id ?
          <Dropdown menu={{ items }} trigger={['click']}>
            <ButtonCustom
              className="normal noBackground"
              icon={arrowDropdownProfile ? <CaretUpOutlined /> : <CaretDownOutlined />}
              onClick={() => setArrowDropdownProfile(!arrowDropdownProfile)}
            >
              My Profile
            </ButtonCustom>
          </Dropdown>
          :
          <ButtonCustom
            className="noBackground fs-17 fw-600"
            onClick={() => navigate('/login')}
          >
            Login
          </ButtonCustom>
      }
    </>
  );
}

export default DropdownProfile;