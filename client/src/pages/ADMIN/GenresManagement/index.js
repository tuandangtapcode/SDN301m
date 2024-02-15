import { Space } from "antd"
import { useEffect, useState } from "react"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import LstIcons from "src/components/ListIcons"
import ConfirmModal from "src/components/ModalCustom/ConfirmModal"
import SpinCustom from "src/components/SpinCustom"
import TableCustom from "src/components/TableCustom"
import GenreService from "src/services/GenreService"
import InsertUpdateGenre from "./components/InsertUpdateGenre"
import ButtonCircle from "src/components/ButtonCustom/ButtonCircle"

const GenresManagement = () => {

  const [insertUpdateGenre, setInsertUpdateGenre] = useState(false)
  const [loading, setLoading] = useState(false)
  const [genres, setGenres] = useState([])
  const [total, setTotal] = useState(0)
  const [pagination, setPagination] = useState({
    TextSearch: "",
    CurrentPage: 1,
    PageSize: 10,
  })

  const getListGenres = async () => {
    try {
      setLoading(true)
      const res = await GenreService.getAllGenres(pagination)
      if (res?.isError) return
      setGenres(res?.data?.List)
      setTotal(res?.data?.Total)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListGenres()
  }, [pagination])

  const handleDeleteGenre = async (GenreID) => {
    try {
      setLoading(true)
      const res = await GenreService.deleteGenre(GenreID)
      if (res?.isError) return
      getListGenres()
    } finally {
      setLoading(false)
    }
  }

  const lstBtn = (record) => (
    [
      {
        name: 'Edit',
        icon: LstIcons.ICON_EDIt,
        onClick: () => setInsertUpdateGenre(record)
      },
      {
        name: 'Delete',
        icon: LstIcons.ICON_DELETE,
        onClick: () => {
          ConfirmModal({
            record,
            title: `Do you want to delete this genre?`,
            okText: "Yes",
            cancelText: "No",
            onOk: async close => {
              handleDeleteGenre(record?._id)
              close()
            },
          })
        }
      }
    ]
  )

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
      width: 170
    },
    {
      title: "Decription",
      align: "center",
      dataIndex: "ShortDecription",
      key: "ShortDecription",
    },
    {
      title: "Action",
      align: "center",
      render: (_, record) => (
        <Space>
          {lstBtn(record).map(i =>
            <ButtonCircle
              className="normal"
              title={i?.name}
              icon={i?.icon}
              onClick={i?.onClick}
            />
          )}
        </Space>
      ),
    },
  ]

  return (
    <SpinCustom spinning={loading}>
      <div className="d-flex-sb mt-25 mb-25">
        <p className="text-matte fs-25 fw-600">Genres Management</p>
        <ButtonCustom
          className="greendBackground medium"
          onClick={() => setInsertUpdateGenre(true)}
        >
          Create new genre
        </ButtonCustom>
      </div>
      <TableCustom
        isPrimary
        columns={column}
        dataSource={genres}
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
        !!insertUpdateGenre &&
        <InsertUpdateGenre
          open={insertUpdateGenre}
          onCancel={() => setInsertUpdateGenre(false)}
          onOk={() => getListGenres()}
        />
      }
    </SpinCustom>
  )
}

export default GenresManagement