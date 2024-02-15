import { useEffect, useState } from "react"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import SpinCustom from "src/components/SpinCustom"
import TableCustom from "src/components/TableCustom"
import ComicService from "src/services/ComicService"
import GenreService from "src/services/GenreService"
import InsertUpdateComic from "./components/InsertUpdateComic"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import moment from "moment"

const ComicsManagement = () => {

  const global = useSelector(globalSelector)
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

  useEffect(() => {
    getListComics()
  }, [pagination])

  const column = [
    {
      title: "STT",
      align: "center",
      render: (_, record, index) => (
        <div>{index + 1}</div>
      ),
    },
    {
      title: "Name",
      align: "center",
      dataIndex: "Title",
      key: "Title",
    },
    {
      title: "Genres",
      align: "center",
      render: (_, record, index) => (
        record?.Genres?.map(i =>
          <p>{i?.Title}</p>
        )
      ),
    },
    {
      title: "Author",
      align: "center",
      render: (_, record, index) => (
        <div>{record?.Author?.FullName}</div>
      ),
    },
    {
      title: "Updated date",
      align: "center",
      render: (_, record, index) => (
        <div>{moment(record?.CreatedAt).format("DD/MM/YYYY")}</div>
      ),
    },
    {
      title: "Likes",
      align: "center",
      render: (_, record, index) => (
        <div>{record?.Likes}</div>
      ),
    },
    {
      title: "Reads",
      align: "center",
      render: (_, record, index) => (
        <div>{record?.Reads}</div>
      ),
    },
  ]

  return (
    <SpinCustom spinning={loading}>
      <div className="d-flex-sb mb-15">
        <p className="text-matte fs-25 fw-600">Comics Management</p>
        <ButtonCustom
          className="greendBackground medium"
          onClick={() => {
            if (!!global?.genres.length) {
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
        pagination={{
          hideOnSinglePage: total <= 10,
          current: pagination?.CurrentPage,
          pageSize: pagination?.PageSize,
          responsive: true,
          total: total,
          locale: { items_per_page: "" },
          showSizeChanger: total > 10,
          onChange: (CurrentPage, PageSize) =>
            setPagination({
              ...pagination,
              CurrentPage,
              PageSize,
            }),
        }}
      />
      {
        !!insertUpdateComic &&
        <InsertUpdateComic
          open={insertUpdateComic}
          onCancel={() => setInsertUpdateComic(false)}
          onOk={() => getListComics()}
        />
      }
    </SpinCustom>
  )
}

export default ComicsManagement