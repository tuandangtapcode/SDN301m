import HeaderAdmin from "src/components/Header/HeaderAdmin";
import { menuItem } from "./MenuItem";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuAdminStyled } from "./styled";
import { Menu } from "antd";
import { useDispatch } from "react-redux";
import globalSlice from "src/redux/globalSlice";

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
        <div className="menu-container">
          <Menu
            onClick={e => handleChangeMenu(e.key)}
            items={menuItem()}
            selectedKeys={location?.pathname}
          />
        </div>
        <div className="content-container">
          {children}
        </div>
      </MenuAdminStyled>
    </div>
  );
}

export default LayoutAdmin;