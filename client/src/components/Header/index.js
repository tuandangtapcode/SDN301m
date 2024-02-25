import { useNavigate } from "react-router-dom";
import DropdownProfile from "./components/DropdownProfile";
import PopoverMain from "./components/PopoverMain";
import {
  HeaderContainerStyled,
  HeaderStyled,
  InputHeaderStyled,
} from "./styled";
import LstIcons from "src/components/ListIcons";
import { useSelector } from "react-redux";
import { globalSelector } from "src/redux/selector";

const MainHeader = () => {
  const navigate = useNavigate();
  const global = useSelector(globalSelector);

  return (
    <HeaderContainerStyled>
      <HeaderStyled>
        <div className="d-flex-sb">
          <div className="d-flex-sb">
            <img
              style={{ width: "70px", height: "70px" }}
              src="Lire Le Logo Du Livre _ Vecteur Premium (1).png"
              alt=""
              onClick={() => navigate("/")}
            />
            {global?.user?.RoleID !== 1 && (
              <>
                <PopoverMain />
                <InputHeaderStyled
                  allowClear={{ clearIcon: LstIcons.ICON_CLOSE }}
                  prefix={LstIcons.ICON_SEARCH}
                  placeholder="Search by title, author, or keyword"
                  size="large"
                />
              </>
            )}
          </div>
          <div>
            <DropdownProfile />
          </div>
        </div>
      </HeaderStyled>
    </HeaderContainerStyled>
  );
};

export default MainHeader;
