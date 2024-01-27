import HeaderAdmin from "src/components/Header/HeaderAdmin"
import { menuItem } from "./MenuItem"
import { useLocation, useNavigate } from "react-router-dom"
import { MenuAdminStyled } from "./styled"
import { Col, Menu, Row } from "antd"
import { useDispatch } from "react-redux"
import globalSlice from "src/redux/globalSlice"

const LayoutAdmin = ({ children }) => {

  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const handleLogout = () => {
    localStorage.removeItem('token')
    dispatch(globalSlice.actions.setUser({}))
    navigate('/login')
  }

  const handleChangeMenu = (key) => {
    if (key !== "logout") {
      navigate(key)
    } else {
      handleLogout()
    }
  }

  return (
    <div>
      <HeaderAdmin />
      <MenuAdminStyled>
        <Row style={{ flexWrap: "nowrap", height: '100vh' }}>
          <Col span={4}>
            <div className="menu-container">
              <Menu
                onClick={e => handleChangeMenu(e.key)}
                items={menuItem()}
                selectedKeys={location?.pathname}
              />
            </div>
          </Col>
          <Col span={20}>
            <div className="content-container">
              {children}
            </div>
          </Col>
        </Row>
      </MenuAdminStyled>
    </div>
  );
}

export default LayoutAdmin;