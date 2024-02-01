import { Link, useNavigate } from "react-router-dom"
import DropdownProfile from "../components/DropdownProfile"
import { BadgeStyled, HeaderContainerStyled, HeaderStyled } from "../styled"
import { Dropdown } from "antd"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import { AiFillBell } from "react-icons/ai"

const HeaderAdmin = () => {

  const navigate = useNavigate()

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
  ]

  return (
    <HeaderContainerStyled>
      <HeaderStyled>
        <div className="d-flex-sb">
          <div className="d-flex-sb">
            <img
              style={{ width: '70px', height: '70px', cursor: "pointer" }}
              src="Lire Le Logo Du Livre _ Vecteur Premium (1).png"
              alt=""
              onClick={() => navigate('/dashboard')}
            />
          </div>
          <div className="d-flex-sb">
            <Dropdown menu={{ items }} trigger={['click']}>
              <BadgeStyled
                size="small"
                count={5}
                style={{ fontSize: '10px', padding: '0px 1px 6px 2px', borderColor: 'transparent' }}
              >
                <ButtonCustom
                  className="noBackground"
                  icon={<AiFillBell className="fs-20" style={{ color: 'white' }} />}
                />
              </BadgeStyled>
            </Dropdown>

            <Dropdown menu={{ items }} trigger={['click']}>
              <ButtonCustom className="normal noBackground">
                Admintrator
              </ButtonCustom>
            </Dropdown>
          </div>
        </div>
      </HeaderStyled>
    </HeaderContainerStyled>
  );
}

export default HeaderAdmin;