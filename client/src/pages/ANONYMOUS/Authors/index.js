import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableCustom from "src/components/CustomTable";
import InputCustom from "src/components/FloatInput/InputCustom";
import SpinCustom from "src/components/SpinCustom";
import UserService from "src/services/UserService";

const Authors = () => {
  const [loading, setLoading] = useState(false)
  const [listData, setListData] = useState([])
  const [total, setTotal] = useState(0)
  const [pagination, setPagination] = useState({
    TextSearch: "",
    CurrentPage: 1,
    PageSize: 10,
  })

  const getList = async () => {
    try {
      setLoading(true)
      const res = await UserService.getListAuthour(pagination)
      if (res.IsError) return
      setListData(res?.data?.List)
      setTotal(res?.data?.Total)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getList()
  }, [pagination])

  const columns = [
    {
      title: "#",
      width: 50,
      align: "center",
      render: (_, record, index) => (
        <div className="text-center">{index + 1}</div>
      ),
    },
    {
      title: "Author",
      width: 500,
      dataIndex: "FullName",
      key: "FullName",
      render: (_, record) => (
        <Link to={`/author/${record.id}`} />
      )
    },
  ]

  return (
    <SpinCustom spinning={loading}>
      <Row gutter={[16, 16]} className="mt-20">
        <Col span={24}>
          <p className="title-type-1">Authors</p>
        </Col>
        <Col span={24} >
          <InputCustom
            search
            allowClear
            label="Author Name"
          // onSearch={value => {
          //   setPagination(pre => ({
          //     ...pre,
          //     CurrentPage: 1,
          //     TextSearch: value,
          //   }))
          // }}
          />
        </Col>
        <Col span={24}>
          <TableCustom
            isPrimary
            columns={columns}
            dataSource={listData}
            bordered
            // onRow={record => {
            //   return {
            //     onClick: () => {
            //       setOpenModalView(record)
            //     },
            //   }
            // }}
            noMrb
            showPagination
            editableCell
            sticky={{ offsetHeader: -12 }}
            // textEmpty="Không có dữ liệu"
            rowKey="key"
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
        </Col>
      </Row>
    </SpinCustom>
  );
}
export default Authors;