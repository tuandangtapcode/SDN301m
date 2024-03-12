import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import SpinCustom from "src/components/SpinCustom"
import { globalSelector } from "src/redux/selector"
import ComicService from "src/services/ComicService"
import InsertUpdateComic from "./components/InsertUpdateComic"
import { useNavigate } from "react-router-dom"
import ComicItem from "./components/ComicItem"

const MyComic = () => {

  const global = useSelector(globalSelector)
  const navigate = useNavigate()
  const [comics, setComics] = useState([])
  const [total, setTotal] = useState(0)
  const [insertUpdateComic, setInsertUpdateComic] = useState()
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    CurrentPage: 1,
    PageSize: 10,
  })

  const getComicsByAuhtor = async () => {
    try {
      setLoading(true)
      const res = await ComicService.getAllComicsByAuthor({ ...pagination, UserID: global?.user?._id, IsPrivated: true })
      if (res?.isError) return
      setComics(res?.data?.List)
      setTotal(res?.data?.Total)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (global?.user?.RoleID !== 3) navigate('/')
  }, [])

  useEffect(() => {
    if (global?.user?.RoleID === 3) getComicsByAuhtor()
  }, [pagination, global?.user?._id])

  return (
    <SpinCustom spinning={loading}>
      <div className="mt-15 mb-15">
        {
          global?.user?.RoleID === 3 &&
          <ButtonCustom
            className="greendBackground medium"
            onClick={() => setInsertUpdateComic(true)}
          >
            Đăng tải truyện
          </ButtonCustom>
        }
      </div>
      <div className="mt-20 mb-30 d-flex">
        {
          comics?.map(i =>
            <ComicItem data={i} getComicsByAuhtor={getComicsByAuhtor} />
          )
        }
      </div>
      {
        !!insertUpdateComic &&
        <InsertUpdateComic
          open={insertUpdateComic}
          onCancel={() => setInsertUpdateComic(false)}
          onOk={() => getComicsByAuhtor()}
        />
      }
    </SpinCustom>
  )
}

export default MyComic