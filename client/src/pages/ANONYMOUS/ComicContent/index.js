import { Select } from "antd"
import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import LstIcons from "src/components/ListIcons"
import SpinCustom from "src/components/SpinCustom"
import ComicService from "src/services/ComicService"
import ImageService from "src/services/ImageService"
import styled from "styled-components"

const { Option } = Select

const NavigatorContainer = styled.div`
background-color: white;
padding: 12px 12px;
margin: 12px 0;
border-radius: 8px;
`

const ComicContent = () => {

  const { ComicID, ChapterID } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState()
  const [images, setImages] = useState([])
  const [chapters, setChapters] = useState([])
  const [isFixed, setIsFixed] = useState(false)
  const [scrollingDown, setScrollingDown] = useState(true)
  const [fixed, setFixed] = useState()
  const divRef = useRef()

  const getImages = async () => {
    try {
      setLoading(true)
      const res = await ImageService.getAllImagesByChapter({ ComicID, Chapter: ChapterID })
      if (res?.isError) return navigate('/not-found')
      setImages(res?.data)
    } finally {
      setLoading(false)
    }
  }

  const getChapters = async () => {
    try {
      setLoading(true)
      const res = await ComicService.getAllChaptersByComic(ComicID)
      if (res?.isError) return navigate('/not-found')
      setChapters(res?.data)
    } finally {
      setLoading(false)
    }
  }

  const handleScroll = () => {
    // const currentScroll = window.scrollY
    // if (currentScroll > 0 && scrollingDown) {
    //   setScrollingDown(false)
    // } else if (currentScroll === 0 && !scrollingDown) {
    //   setScrollingDown(true)
    // }
    console.log('abafbaf');
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect()
      console.log(rect);
      setIsFixed(rect.top <= 0)
    }
  }
  console.log(isFixed)
  useEffect(() => {
    if (!!ComicID) getChapters()
  }, [ComicID])

  useEffect(() => {
    if (!!ComicID && !!ChapterID) getImages()
  }, [ComicID, ChapterID])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <SpinCustom spinning={loading}>
      <NavigatorContainer>
        <div className="title-type-2 d-flex align-items-center">
          <span className="mr-8">{chapters?.Title}</span>
          <span className="mr-8">-</span>
          <span>
            {
              chapters?.Chapters?.find(i => i?.ChapterID === +ChapterID)?.Name
            }
          </span>
        </div>
        <div
          ref={divRef}
          className="d-flex-center"
          style={{

          }}
        >
          <div
            className="text-matte mr-8 cursor-pointer"
            onClick={() => navigate('/')}
          >
            {LstIcons.ICON_HOME}
          </div>
          <div
            className=" text-matte mr-8 cursor-pointer"
            onClick={() => navigate(`/comic/${ComicID}`)}
          >
            {LstIcons.ICON_MENU}
          </div>
          <Select
            style={{
              minWidth: '70%',
            }}
            size="large "
            defaultValue={+ChapterID}
            onChange={e => navigate(`/comic/${ComicID}/chapter/${e}`)}
          >
            {
              chapters?.Chapters?.sort((a, b) => b.ChapterID - a.ChapterID)?.map(i =>
                <Option key={i?.ChapterID} value={i?.ChapterID}>{i?.Name}</Option>
              )
            }
          </Select>
          <ButtonCustom
            className="greendBackground medium text-white fs-17 ml-8"
            icon={LstIcons.ICON_LIKE}
          >
            Theo dõi
          </ButtonCustom>
        </div>
      </NavigatorContainer>
      <div className="text-center mb-30">
        <div>
          {
            images?.map(i =>
              <img style={{ marginBottom: '-4px' }} src={i?.Image} alt="" />
            )
          }
        </div>
      </div>
    </SpinCustom >
  )
}

export default ComicContent