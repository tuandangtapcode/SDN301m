import { useNavigate } from "react-router-dom"
import DropdownProfile from "../components/DropdownProfile"
import PopoverMain from "../components/PopoverMain"
import { HeaderContainerStyled, HeaderStyled, InputHeaderStyled } from "../styled"
import { SearchOutlined, CloseOutlined } from '@ant-design/icons'
import LstIcons from "src/components/ListIcons"

const MainHeader = () => {

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
              allowClear={{ clearIcon: LstIcons.ICON_CLOSE }}
              prefix={LstIcons.ICON_SEARCH}
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
  )
}

export default MainHeader