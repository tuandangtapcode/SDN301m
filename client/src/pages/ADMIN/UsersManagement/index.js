import moment from "moment"
import { useEffect, useState } from "react"
import SpinCustom from "src/components/SpinCustom"
import TableCustom from "src/components/TableCustom"
import UserService from "src/services/UserService"
import { BsBan } from "react-icons/bs"
import ConfirmModal from "src/components/ModalCustom/ConfirmModal"
import socket from "src/utils/socket"

const UsersManagement = () => {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState()
  const [pagination, setPagination] = useState({
    TextSearch: "",
    CurrentPage: 1,
    PageSize: 10
  })

  const getUsers = async () => {
    try {
      setLoading(true)
      const res = await UserService.getListUser()
      if (res?.isError) return
      setUsers(res?.data?.List)
      setTotal(res?.data?.Total)
    } finally {
      setLoading(false)
    }
  }

  const handleBanned = async (UserID) => {
    try {
      setLoading(true)
      const res = await UserService.deactiveAccount(UserID)
      if (res?.isError) return
      socket.emit("send-deactive", UserID)
      getUsers()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUsers()
  }, [pagination])

  const roles = [
    {
      RoleID: 1,
      RoleName: "Admin"
    },
    {
      RoleID: 3,
      RoleName: "Author"
    },
    {
      RoleID: 4,
      RoleName: "Customer premium"
    },
    {
      RoleID: 5,
      RoleName: "Customer normal"
    }
  ]

  const column = [
    {
      title: "STT",
      align: "center",
      render: (_, record, index) => (
        <div>{index + 1}</div>
      ),
    },
    {
      title: "Full name",
      align: "center",
      dataIndex: "FullName",
      key: "FullName",
    },
    {
      title: "Role",
      align: "center",
      render: (_, record, index) => (
        roles.map(i =>
          i.RoleID === record?.RoleID && <span>{i?.RoleName}</span>
        )
      ),
    },
    {
      title: "Created date",
      align: "center",
      render: (_, record, index) => (
        <div>{moment(record?.CreatedAt).format("DD/MM/YYYY")}</div>
      ),
    },
    {
      title: "IsAcitve",
      align: "center",
      render: (_, record, index) => (
        <>
          {
            record?.IsActive
              ? <div className="active-green">Active</div>
              : <div className="text-red">In-active</div>
          }
        </>
      ),
    },
    {
      title: "Ban",
      align: "center",
      render: (_, record) => (
        <BsBan
          className="text-red fw-700"
          onClick={() =>
            ConfirmModal({
              record,
              title: `Do you want to ban this account?`,
              okText: "Yes",
              cancelText: "No",
              onOk: async close => {
                handleBanned(record?._id)
                close()
              },
            })}
        />
      )
    }
  ]

  return (
    <SpinCustom spinning={loading}>
      <p className="text-center text-matte fs-25 fw-600 mt-30 mb-30">Comics Management</p>
      <TableCustom
        isPrimary
        columns={column}
        dataSource={users}
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

export default UsersManagement