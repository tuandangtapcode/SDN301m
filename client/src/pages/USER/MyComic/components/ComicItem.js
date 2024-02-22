import { Card } from "antd"
import { CardStyled, ComicItemStyled, ImageStyled } from "../styled"
import LstIcons from "src/components/ListIcons"
import ButtonCircle from "src/components/ButtonCustom/ButtonCircle"
import { useState } from "react"
import InsertUpdateComic from "./InsertUpdateComic"
const { Meta } = Card

const ComicItem = ({ data, getComicsByAuhtor }) => {

  const [insertUpdateComic, setInsertUpdateComic] = useState()

  return (
    <ComicItemStyled>
      <CardStyled
        cover={<ImageStyled alt="example" src={data?.Comic?.AvatarPath} />}
      >
        <div className="d-flex-sb">
          <Meta title={data?.Comic?.Title} />
          <ButtonCircle
            className="normal icon-preview"
            title={"review"}
            icon={LstIcons.ICON_PREVIEW}
            style={{
              position: 'absolute',
              right: '20px',
              bottom: '-2px'
            }}
            onClick={() => setInsertUpdateComic(data)}
          />
          <span>
            {data?.Comic?.Status ? LstIcons.ICON_CONFIRM : LstIcons.ICON_PENDING_CONFIRM}
          </span>
        </div>
      </CardStyled>
      {
        !!insertUpdateComic &&
        <InsertUpdateComic
          open={insertUpdateComic}
          onCancel={() => setInsertUpdateComic(false)}
          onOk={() => getComicsByAuhtor()}
        />
      }
    </ComicItemStyled>
  )
}

export default ComicItem