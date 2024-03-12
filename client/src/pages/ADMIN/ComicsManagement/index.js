import { useEffect, useState } from "react"
import SpinCustom from "src/components/SpinCustom"
import TableCustom from "src/components/TableCustom"
import ComicService from "src/services/ComicService"
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
import { listStatusComic } from "src/lib/constant"
import InputCustom from "src/components/FloatInput/InputCustom"

const ComicsManagement = () => {

  const global = useSelector(globalSelector)
  const [comics, setComics] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    TextSearch: "",
    CurrentPage: 1,
    PageSize: 10,
  })

  const getListComics = async () => {
    try {
      setLoading(true)
      const res = await ComicService.getAllComics({ ...pagination, isAdmin: true })
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
        Content: Status === 1
          ? `Admintrator đã phê duyệt truyện của bạn`
          : Status === 2
            ? `Truyện của bạn bị nghi đã vi phạm những quy chuẩn cộng đồng nên đã bị hủy kiểm duyệt. Nếu việc này tiếp diễn tài khoản của bạn sẽ bị cấm vĩnh viễn`
            : `Truyện của bạn đã bị cấm vì những vi phạm cộng đồng. Nếu việc này tiếp diễn tài khoản của bạn sẽ bị cấm vĩnh viễn`,
        Sender: global?.user?._id,
        Receiver: record?.Author?._id
      }
      const resNoti = await NotificaitonService.createNotification(body)
      if (resNoti?.isError) return
      socket.emit('send-notification', { Content: body.Content, Receiver: body.Receiver, IsSeen: Status })
      getListComics()
    } finally {
      setLoading(false)
    }
  }

  const lstBtn = (record) => (
    [
      {
        name: 'Duyệt',
        disabled: record?.Status === 0 ? false : true,
        icon: LstIcons.ICON_CONFIRM,
        onClick: () => {
          ConfirmModal({
            record,
            title: `Bạn có chắc duyệt truyện này?`,
            okText: "Yes",
            cancelText: "No",
            onOk: async close => {
              handleChangeStatusComic(record, 1)
              close()
            },
          })
        }
      },
      {
        name: 'Không duyệt',
        disabled: record?.Status === 0 ? false : true,
        icon: LstIcons.ICON_CLOSE_RED,
        onClick: () => {
          ConfirmModal({
            record,
            title: `Bạn có chắc không duyệt truyện này?`,
            okText: "Yes",
            cancelText: "No",
            onOk: async close => {
              handleChangeStatusComic(record, 2)
              close()
            },
          })
        }
      },
      {
        name: 'Cấm',
        disabled: record?.Status === 1 ? false : true,
        icon: LstIcons.ICON_DELETE,
        onClick: () => {
          ConfirmModal({
            record,
            title: `Bạn có chắc cấm hiển thị truyện này?`,
            okText: "Yes",
            cancelText: "No",
            onOk: async close => {
              handleChangeStatusComic(record, 3)
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
      title: "Tên truyện",
      align: "center",
      dataIndex: "Title",
      key: "Title",
    },
    {
      title: "Thể loại",
      align: "center",
      width: 170,
      render: (_, record, index) => (
        record?.Genres?.map(i =>
          <p>{i?.Title}</p>
        )
      ),
    },
    {
      title: "Tác giả",
      align: "center",
      render: (_, record, index) => (
        <div>{record?.Author?.FullName}</div>
      ),
    },
    {
      title: "Ngày cập nhật",
      align: "center",
      width: 100,
      render: (_, record, index) => (
        <div>{moment(record?.updatedAt).format("DD/MM/YYYY")}</div>
      ),
    },
    {
      title: "Lượt theo dõi",
      align: "center",
      width: 80,
      render: (_, record, index) => (
        <div>{record?.Likes}</div>
      ),
    },
    {
      title: "Lượt đọc",
      align: "center",
      width: 80,
      render: (_, record, index) => (
        <div>{record?.Reads}</div>
      ),
    },
    {
      title: "Trạng thái",
      align: "center",
      render: (_, record, index) => (
        <div className={["text-blue", "active-green", "text-black", "text-red"][record?.Status]}>
          {
            listStatusComic.find(i => i?.Status === record?.Status)?.Content
          }
        </div>
      ),
    },
    {
      title: "Chức năng",
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
      <div className="mb-10">
        <p className="title-type-1">Quản lý truyện</p>
      </div>
      <div className="mb-15">
        <InputCustom
          search
          label="Nhập vào tên truyện"
          onSearch={e => setPagination({ ...pagination, TextSearch: e })}
        />
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
    </SpinCustom>
  )
}

export default ComicsManagement