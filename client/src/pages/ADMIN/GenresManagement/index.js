import { Button, Col, Row, Space } from "antd";
import { useEffect, useState } from "react"
import ButtonCircle from "src/components/ButtonCustom/ButtonCircle";
import InputCustom from "src/components/FloatInput/InputCustom";
import SpinCustom from "src/components/SpinCustom"
import TableCustom from "src/components/TableCustom";
import GenreService from "src/services/GenreService";
import ModalGenres from "./components/Modal_AE";

const GenresManagement = () => {
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [genres, setGenres] = useState([])
  const [modalGenres, setModalGenres] = useState(false)
  const [pagination, setPagination] = useState({
    TextSearch: "",
    CurrentPage: 1,
    PageSize: 10,
  })

  const column = [
    {
      title: "#",
      width: 35,
      align: "center",
      render: (_, record, index) => (
        <div className="text-center">{index + 1}</div>
      ),
    },
    {
      title: "Genres Name",
      width: 100,
      align: "center",
      dataIndex: "Title",
      key: "Title",
    },
    {
      title: "Short Decription",
      width: 300,
      align: "center",
      dataIndex: "ShortDecription",
      key: "ShortDecription",
    },
    {
      title: "Action ",
      width: 100,
      align: "center",
      dataIndex: "Title",
      key: "Title",
      render: (_, record) => (
        <Space direction="horizontal">
          <ButtonCircle>edit</ButtonCircle>
          <ButtonCircle>delete</ButtonCircle>
        </Space>
      )
    },
  ]

  const getList = async () => {
    setLoading(true)
    try {
      const res = await GenreService.getAllGenres(pagination)
      if (res.isError) return
      setGenres(res?.data?.List)
      setTotal(res?.data?.Total)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getList()
  }, [pagination])

  return (
    <SpinCustom spinning={loading}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <p className="title-type-1">Genres Management</p>
        </Col>
        <Col span={18} >
          <InputCustom
            search
            allowClear
            label="Genres Name"
            onSearch={value => {
              setPagination(pre => ({
                ...pre,
                CurrentPage: 1,
                TextSearch: value,
              }))
            }}
          />
        </Col>
        <Col span={6} className="d-flex-end">
          <Button onClick={() => setModalGenres(true)}>
            Create new genres
          </Button>
        </Col>
        <Col span={24}>
          <TableCustom
            isPrimary
            columns={column}
            dataSource={genres}
            bordered
            noMrb
            showPagination
            editableCell
            sticky={{ offsetHeader: -12 }}
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
        {!!modalGenres && (
          <ModalGenres
            open={modalGenres}
            onCancel={() => setModalGenres(false)}
            onOk={() => getList()}
          />
        )}
      </Row>
    </SpinCustom>
  );
}

export default GenresManagement;