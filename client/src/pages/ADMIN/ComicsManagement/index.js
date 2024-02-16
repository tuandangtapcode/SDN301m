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
import LstIcons from "src/components/ListIcons"
import ConfirmModal from "src/components/ModalCustom/ConfirmModal"
import { Space } from "antd"
import ButtonCircle from "src/components/ButtonCustom/ButtonCircle"
import NotificaitonService from "src/services/NotificationService"
import socket from "src/utils/socket"

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

  const handleChangeStatusComic = async (record, Status) => {
    try {
      setLoading(true)
      const res = await ComicService.changeStatusComic({ ComicID: record?._id, Status })
      if (res?.isError) return toast.error(res?.msg)
      const body = {
        Content: Status ? `${global?.user?.FullName} đã phê duyệt truyện của bạn` : `Truyện của bạn đã bị khóa vì những vi phạm cộng đồng. Nếu việc này tiếp diễn tài khoản của bạn sẽ bị cấm vĩnh viễn`,
        Sender: global?.user?._id,
        Receiver: record?.Author?._id
      }
      const resNoti = await NotificaitonService.createNotification(body)
      if (resNoti?.isError) return
      socket.emit('send-notification', { Content: body.Content, Receiver: body.Receiver, IsSeen: Status, CreatedAt: Date.now() })
      getListComics()
    } finally {
      setLoading(false)
    }
  }

  const lstBtn = (record) => (
    [
      {
        name: 'Confirm',
        disabled: record?.Status ? true : false,
        icon: LstIcons.ICON_CONFIRM,
        onClick: () => {
          ConfirmModal({
            record,
            title: `Do you want to post this comic?`,
            okText: "Yes",
            cancelText: "No",
            onOk: async close => {
              handleChangeStatusComic(record, true)
              close()
            },
          })
        }
      },
      {
        name: 'Report',
        disabled: record?.Status ? false : true,
        icon: LstIcons.ICON_CLOSE_RED,
        onClick: () => {
          ConfirmModal({
            record,
            title: `Do you want to un post this comic?`,
            okText: "Yes",
            cancelText: "No",
            onOk: async close => {
              handleChangeStatusComic(record, false)
              close()
            },
          })
        }
      },
      {
        name: 'Edit',
        disabled: record?.Author?._id === global?.user?._id ? false : true,
        icon: LstIcons.ICON_EDIt,
        // onClick: () => setInsertUpdateGenre(record)
      },
      {
        name: 'Delete',
        icon: LstIcons.ICON_DELETE,
        onClick: () => {
          ConfirmModal({
            record,
            title: `Do you want to delete this comic?`,
            okText: "Yes",
            cancelText: "No",
            onOk: async close => {
              // handleDeleteGenre(record?._id)
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
      width: 60,
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
      width: 170,
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
      width: 100,
      render: (_, record, index) => (
        <div>{moment(record?.CreatedAt).format("DD/MM/YYYY")}</div>
      ),
    },
    {
      title: "Likes",
      align: "center",
      width: 80,
      render: (_, record, index) => (
        <div>{record?.Likes}</div>
      ),
    },
    {
      title: "Reads",
      align: "center",
      width: 80,
      render: (_, record, index) => (
        <div>{record?.Reads}</div>
      ),
    },
    {
      title: "Status",
      align: "center",
      render: (_, record, index) => (
        <>
          {
            record?.Status
              ? <div className="active-green">Posted</div>
              : <div className="text-red">Not posted yet</div>
          }
        </>
      ),
    },
    {
      title: "Action",
      align: "center",
      width: 170,
      render: (_, record) => (
        <Space>
          {lstBtn(record).map(i =>
            <ButtonCircle
              className="normal"
              disabled={i?.disabled}
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
      <div className="d-flex-sb mb-10">
        <p className="title-type-1">Comics Management</p>
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