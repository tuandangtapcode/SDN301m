import { Card } from "antd"
import { CardStyled, ComicItemStyled, ImageStyled } from "../styled"
import LstIcons from "src/components/ListIcons"
const { Meta } = Card

const ComicItem = ({ comic }) => {
  return (
    <ComicItemStyled>
      <CardStyled
        cover={<ImageStyled alt="example" src={comic?.AvatarPath} />}
      >
        <Meta title={comic?.Title} />
        <span
          style={{
            position: 'absolute',
            right: '8px',
            bottom: '-8px'
          }}
        >
          {comic?.Status ? LstIcons.ICON_CONFIRM : LstIcons.ICON_PENDING_CONFIRM}
        </span>
      </CardStyled>
    </ComicItemStyled>
  )
}

export default ComicItem