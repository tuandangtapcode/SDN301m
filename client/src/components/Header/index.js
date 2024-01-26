import { HeaderContainerStyled, HeaderStyled, InputHeaderStyled } from "./styled"
import { SearchOutlined, CloseOutlined } from '@ant-design/icons'
import DropdownProfile from "./components/DropdownProfile"
import PopoverMain from "./components/PopoverMain"
import { useNavigate } from "react-router-dom"

const Header = () => {

  const navigate = useNavigate()

  return (
    <HeaderContainerStyled>
      <HeaderStyled>
        <div className="d-flex-sb">
          <div className="d-flex-sb">
            <img
              style={{ width: '70px', height: '70px' }}
              src="Lire Le Logo Du Livre _ Vecteur Premium (1).png"
              alt=""
              onClick={() => navigate('/')}
            />
            <PopoverMain />
            <InputHeaderStyled
              allowClear={{ clearIcon: <CloseOutlined className="text" /> }}
              prefix={<SearchOutlined className="text" />}
              placeholder='Search by title, author, or keyword'
              size="large"
            />
          </div>
          <div>
            <DropdownProfile />
          </div>
        </div>
      </HeaderStyled>
    </HeaderContainerStyled>
  );
}

export default Header;