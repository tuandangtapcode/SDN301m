import { DatePicker, Select } from "antd"
import moment from "moment"
import { useEffect, useState } from "react"
import InputCustom from "src/components/FloatInput/InputCustom"
import SpinCustom from "src/components/SpinCustom"
import TableCustom from "src/components/TableCustom"
import PaymentService from "src/services/PaymentService"
import dayjs from "dayjs"

const { Option } = Select

const PaymentManagement = () => {

  const [loading, setLoading] = useState(false)
  const [payments, setPayments] = useState([])
  const [total, setTotal] = useState(0)
  const [pagination, setPagination] = useState({
    TextSearch: "",
    CurrentPage: 1,
    PageSize: 4,
    Type: "",
    Date: ""
  })

  const getAllPayments = async () => {
    try {
      setLoading(true)
      const res = await PaymentService.getAllPayments(pagination)
      if (res?.isError) return
      setPayments(res?.data?.List)
      setTotal(res?.data?.Total)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!pagination.Type || (!!pagination.Type && pagination.TextSearch) || (!!pagination.Type && pagination.Date)) {
      getAllPayments()
    }
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
      title: "Người mua",
      align: "center",
      render: (_, record, index) => (
        <div>
          {record?.UserName}
        </div>
      ),
    },
    {
      title: "Tên gói",
      align: "center",
      render: (_, record, index) => (
        <div>
          {record?.PackageID?.Title}
        </div>
      ),
    },
    {
      title: "Ngày mua",
      align: "center",
      render: (_, record, index) => (
        <div>
          {moment(record?.BoughtAt).format("DD/MM/YYYY")}
        </div>
      ),
    },
    {
      title: "Người hết hạn",
      align: "center",
      render: (_, record, index) => (
        <div>
          {moment(record?.EndedAt).format("DD/MM/YYYY")}
        </div>
      ),
    },
  ]


  return (
    <SpinCustom spinning={loading}>
      <div className="d-flex-sb mb-10">
        <p className="title-type-1">Lịch sử giao dịch</p>
      </div>
      <div className="mb-15">
        <Select
          className="mb-16"
          style={{ width: "100%" }}
          placeholder="Chọn loại dữ liệu cần tìm kiếm"
          onChange={e => setPagination({ ...pagination, Type: e })}
        >
          <Option value="">Chọn loại dữ liệu cần tìm kiếm</Option>
          <Option value="User">Tìm kiếm theo tên người mua Premium</Option>
          <Option value="BoughtAt">Tìm kiếm theo ngày bắt đầu gói</Option>
          <Option value="EndedAt">Tìm kiếm theo ngày kết thúc gói</Option>
        </Select>
        {
          pagination.Type === "User" &&
          <InputCustom
            search
            label="Nhập vào..."
            onSearch={e => setPagination({ ...pagination, TextSearch: e })}
          />
        }
        {
          (pagination.Type === "BoughtAt" || pagination.Type === "EndedAt") &&
          <DatePicker
            placeholder="Chọn ngày"
            style={{ width: '100%' }}
            onChange={e => setPagination({ ...pagination, Date: dayjs(e).format() })}
          />
        }
      </div>

      <TableCustom
        isPrimary
        columns={column}
        dataSource={payments}
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

export default PaymentManagement