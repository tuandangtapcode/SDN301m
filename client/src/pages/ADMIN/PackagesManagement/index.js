import { useEffect, useState } from "react"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import LstIcons from "src/components/ListIcons"
import ConfirmModal from "src/components/ModalCustom/ConfirmModal"
import SpinCustom from "src/components/SpinCustom"
import TableCustom from "src/components/TableCustom"
import PackageService from "src/services/PackageService"
import InsertUpdatePackage from "./components/InsertUpdatePackage"
import { formatNumberToK } from "src/lib/stringUtils"
import { Space } from "antd"
import ButtonCircle from "src/components/ButtonCustom/ButtonCircle"

const PackageManagement = () => {

  const [loading, setLoading] = useState(false)
  const [packages, setPackages] = useState([])
  const [total, setTotal] = useState(0)
  const [openInsertUpdatePackage, setOpenInsertUpdatePackage] = useState(false)
  const [pagination, setPagination] = useState({
    CurrentPage: 1,
    PageSize: 10,
  })

  const getPackages = async () => {
    try {
      setLoading(true)
      const res = await PackageService.getAllPackages(pagination)
      if (res?.isError) return
      setPackages(res?.data?.List)
      setTotal(res?.data?.Total)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getPackages()
  }, [pagination])

  const lstBtn = (record) => (
    [
      {
        name: 'Edit',
        icon: LstIcons.ICON_EDIt,
        onClick: () => setOpenInsertUpdatePackage(record)
      },
      {
        name: 'Delete',
        icon: LstIcons.ICON_DELETE,
        onClick: () => {
          ConfirmModal({
            record,
            title: `Do you want to delete this package?`,
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
      width: 170
    },
    {
      title: "Price",
      align: "center",
      dataIndex: "Price",
      key: "Price",
      width: 150,
      render: (_, record, index) => (
        <div>{formatNumberToK(record?.Price)} VNĐ</div>
      ),
    },
    {
      title: "Duration",
      align: "center",
      dataIndex: "Duration",
      key: "Duration",
      width: 120,
      render: (_, record, index) => (
        <div>{record?.Duration} ngày</div>
      ),
    },
    {
      title: "Quantity",
      align: "center",
      dataIndex: "Quantity",
      key: "Quantity",
      width: 120
    },
    {
      title: "Action",
      align: "center",
      width: 100,
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
      <div className="d-flex-sb mb-10">
        <p className="title-type-1">Packages Management</p>
        <ButtonCustom
          className="greendBackground medium"
          onClick={() => setOpenInsertUpdatePackage(true)}
        >
          Create new package
        </ButtonCustom>
      </div>
      <TableCustom
        isPrimary
        columns={column}
        dataSource={packages}
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
        !!openInsertUpdatePackage &&
        <InsertUpdatePackage
          open={openInsertUpdatePackage}
          onCancel={() => setOpenInsertUpdatePackage(false)}
          onOk={() => getPackages()}
        />
      }
    </SpinCustom>
  )
}

export default PackageManagement