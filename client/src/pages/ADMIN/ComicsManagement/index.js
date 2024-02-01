import { useEffect, useState } from "react"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import SpinCustom from "src/components/SpinCustom"
import TableCustom from "src/components/TableCustom"
import ComicService from "src/services/ComicService"
import GenreService from "src/services/GenreService"
import InsertUpdateComic from "./components/InsertUpdateComic"
import { toast } from "react-toastify"

const ComicsManagement = () => {

  const [genres, setGenres] = useState([])
  const [comics, setComics] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [insertUpdateComic, setInsertUpdateComic] = useState()
  const [pagination, setPagination] = useState({
    TextSearch: "",
    CurrentPage: 1,
    PageSize: 10,
  })

  const getListComics = async () => {
    try {
      setLoading(true)
      const res = await ComicService.getAllComics(pagination)
      if (res?.isError) return
      setComics(res?.data?.List)
      setTotal(res?.data?.Total)
    } finally {
      setLoading(false)
    }
  }

  const getListGenres = async () => {
    try {
      setLoading(true)
      const res = await GenreService.getAllGenres()
      if (res?.isError) return
      setGenres(res?.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListComics()
  }, [pagination])

  useEffect(() => {
    getListGenres()
  }, [])

  const column = [
    {
      title: "STT",
      align: "center",
      render: (_, record, index) => (
        <div className="text-center">{index + 1}</div>
      ),
    },
    {
      title: "Tên truyện",
      align: "center",
      dataIndex: "Title",
      key: "Title",
    },
  ]

  return (
    <SpinCustom spinning={loading}>
      <div className="d-flex-sb mb-15">
        <p className="title-type-1">Comics Management</p>
        <ButtonCustom
          className="greendBackground"
          onClick={() => {
            if (!!genres.length) {
              setInsertUpdateComic(true)
            } else {
              return toast.error('Chưa có thể loại truyền nào')
            }
          }}
        >
          Create new comic
        </ButtonCustom>
      </div>
      <TableCustom
        isPrimary
        columns={column}
        dataSource={comics}
      />
      {
        !!insertUpdateComic &&
        <InsertUpdateComic
          open={insertUpdateComic}
          onCancel={() => setInsertUpdateComic(false)}
          onOk={() => getListComics}
          genres={genres}
        />
      }
    </SpinCustom>
  );
}

export default ComicsManagement;