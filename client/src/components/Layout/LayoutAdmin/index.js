import HeaderAdmin from "src/components/Header/HeaderAdmin"
import { menuItem } from "./MenuItem"
import { useLocation, useNavigate } from "react-router-dom"
import { LayoutAdminStyled, MenuAdminStyled } from "./styled"
import { Col, List, Menu, Row } from "antd"
import { useDispatch } from "react-redux"
import globalSlice from "src/redux/globalSlice"
import ButtonCircle from "src/components/ButtonCustom/ButtonCircle"
import { useState } from "react"
import LstIcons from "src/components/ListIcons"
import ButtonCustom from "src/components/ButtonCustom/MyButton"

const LayoutAdmin = ({ children }) => {

  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [collapsed, setCollapsed] = useState(false)

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
    <LayoutAdminStyled>
      <HeaderAdmin />
      <Row style={{ flex: 1 }}>
        <Col span={4}>
          <div
            className="menu-container"
            style={{
              width: collapsed ? "90px" : "100%"
            }}
          >
            <Menu
              inlineCollapsed={collapsed}
              mode="inline"
              onClick={e => handleChangeMenu(e.key)}
              items={menuItem()}
              selectedKeys={location?.pathname}
            />
            <div
              className="collapsed-menu cursor-pointer d-flex"
              onClick={() => setCollapsed(!collapsed)}
            >
              <div className="mr-8">
                {collapsed ? LstIcons.ICON_MENUUNFOLD : LstIcons.ICON_MENUFOLD}
              </div>
              <p style={{ display: collapsed ? "none" : "block" }}>Collapsed</p>
            </div>
          </div>
        </Col>
        <Col span={20}>
          <div className="content-container">
            {children}
          </div>
        </Col>
      </Row>
    </LayoutAdminStyled >
  )
}

export default LayoutAdmin