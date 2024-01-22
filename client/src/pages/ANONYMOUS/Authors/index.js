import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import TableCustom from "src/components/CustomTable";
import SpinCustom from "src/components/SpinCustom";

const Authors = () => {
  const [loading, setLoading] = useState(false)
  const [listData, setListData] = useState([])
  const [pagination, setPagination] = useState({
    TextSearch: "",
    CurrentPage: 1,
    PageSize: 10,
    Status: 0,
  })

  const getList = async () => {
    try {
      setLoading(true)
      // const res = await LandService.getListLand(pagination)
      // if (res.IsError) return
      // setListData(res?.Object)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getList()
  }, [pagination])

  const columns = [
    {
      title: "STT",
      width: 50,
      align: "center",
      render: (_, record, index) => (
        <div className="text-center">{index + 1}</div>
      ),
    },
    {
      title: "Tên tác giả",
      width: 500,
      dataIndex: "FullName",
      key: "FullName",
    },
  ]

  return (
    <SpinCustom spinning={loading}>
      <Row gutter={[16, 16]}>
        <Col span={18}>

        </Col>
        <Col span={6}>

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
            textEmpty="Không có dữ liệu"
            rowKey="key"
          />
        </Col>
      </Row>
    </SpinCustom>
  );
}
export default Authors;