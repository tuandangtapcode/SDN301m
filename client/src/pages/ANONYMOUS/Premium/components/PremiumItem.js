import ButtonCustom from "src/components/ButtonCustom/MyButton"
import { DotStyled, PremiumItemStyled } from "../styled"
import { formatNumberToK } from "src/lib/stringUtils"
import { useNavigate } from "react-router-dom"

const PremiumItem = ({ premium, color }) => {

  const navigate = useNavigate()

  return (
    <PremiumItemStyled>
      <div>
        <div style={{ color: color }} className="text-center fs-20 fw-600 mb-12">{premium?.Title}</div>
        <div className="text-white text-center">{formatNumberToK(premium?.Price)}</div>
      </div>
      <div>
        {
          premium?.Description.split('\n').map(line =>
            <div className="text-white mb-8">
              <DotStyled />
              <span>{line}</span>
            </div>
          )
        }
      </div>
      <ButtonCustom
        className="submit"
        onClick={() => navigate(`/premium/${premium?._id}`)}
      >
        Mua premium {premium?.Title}
      </ButtonCustom>
    </PremiumItemStyled>
  )
}

export default PremiumItem