import { Select } from "antd"
import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import LstIcons from "src/components/ListIcons"
import ConfirmModal from "src/components/ModalCustom/ConfirmModal"
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

  const getImages = async () => {
    try {
      setLoading(true)
      const res = await ImageService.getAllImagesByChapter({ ComicID, Chapter: ChapterID, Date: Date.now() })
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

  useEffect(() => {
    if (!!ComicID) getChapters()
  }, [ComicID])

  useEffect(() => {
    if (!!ComicID && !!ChapterID) getImages()
  }, [ComicID, ChapterID])

  const handleScroll = () => {
    var height = document.documentElement.scrollTop
    console.log(height);
    window.scrollTo(0, height)
    var timer = setInterval(function () {
      if (height <= 0) {
        clearInterval(timer)
      }
      window.scrollBy(0, -30)
      height -= 30
    }, 1)
  }


  // window.addEventListener("scroll", function () {
  //   var scrolled = document.documentElement.scrollTop
  //   if (scrolled > 100) {
  //     document.getElementById("scrollToTopButton").style.display = "block"
  //   } else {
  //     document.getElementById("scrollToTopButton").style.display = "none"
  //   }
  // })

  // useEffect(() => {
  //   if (document.documentElement.scrollTop === 0 && !!document.getElementById("scrollToTopButton")) {
  //     document.getElementById("scrollToTopButton").style.display = "none"
  //   }
  // }, [document.documentElement.scrollTop])

  return (
    <SpinCustom spinning={loading}>
      <NavigatorContainer>
        <div className="title-type-2 d-flex align-items-center" id="id">
          <span className="mr-8">{chapters?.Title}</span>
          <span className="mr-8">-</span>
          <span>
            {
              chapters?.Chapters?.find(i => i?.ChapterID === +ChapterID)?.Name
            }
          </span>
        </div>
        <div
          className="d-flex-center"
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
            onChange={e => {
              if (e > 2) {
                if (!global?.user?._id || global?.user?.RoleID === 5) {
                  ConfirmModal({
                    title: `Mua premium để có thể đọc nhiều chapter hơn`,
                    okText: "Mua premium",
                    cancelText: "Hủy",
                    onOk: async close => {
                      navigate('/premium')
                      close()
                    },
                  })
                } else {
                  navigate(`/comic/${ComicID}/chapter/${e}`)
                }
              } else {
                navigate(`/comic/${ComicID}/chapter/${e}`)
              }
            }}
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

      <ButtonCustom
        id="scrollToTopButton"
        style={{
          position: 'fixed',
          bottom: 30,
          right: 60
        }}
        onClick={() => handleScroll()}
      >
        {LstIcons.ICON_CARET_UP}
      </ButtonCustom>
    </SpinCustom >
  )
}

export default ComicContent