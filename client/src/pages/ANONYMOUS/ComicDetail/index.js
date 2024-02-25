import { Col, Row, Table } from "antd"
import moment from "moment"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Rating from "src/components/Rating"
import SpinCustom from "src/components/SpinCustom"
import ComicService from "src/services/ComicService"
import InforComic from "./components/InforComic"
import LstIcons from "src/components/ListIcons"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import { ComicDetailStyled } from "./styled"
import { formatNumber } from "src/lib/stringUtils"
import ButtonCircle from "src/components/ButtonCustom/ButtonCircle"
import { useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import { toast } from "react-toastify"
import ModalReport from "./components/ModalReport"


const ComicDetail = () => {

  const { ComicID } = useParams()
  const navigate = useNavigate()
  const global = useSelector(globalSelector)
  const [loading, setLoading] = useState()
  const [comic, setComic] = useState()
  const [totalChapter, setTotalChapter] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)

  const getComic = async () => {
    try {
      setLoading(true)
      const res = await ComicService.getDetailComic(ComicID)
      if (res?.isError) return navigate('/not-found')
      setComic(res?.data)
      setTotalChapter(res?.data?.Chapters?.length || 0)
    } finally {
      setLoading(false)
    }
  }

  const handleReport = () => {
    if (!!global?.user?._id) {
      setOpenModal({
        UserID: global?.user?._id,
        ComicID: comic?._id
      })
    } else {
      toast.info("Vui lòng đăng nhập trước khi báo cáo!")
      navigate("/login")
    }
  }

  useEffect(() => {
    getComic()
  }, [ComicID])

  console.log(global);

  const column = [
    {
      title: "Số chương",
      dataIndex: "Name",
      key: "Name",
      align: 'center',
      render: (_, record, index) => (
        <div
          className="cursor-pointer chapter-link"
          onClick={() => navigate(`/comic/${comic?._id}/chapter/${record?.ChapterID}`)}
        >
          {record?.Name}
        </div>
      ),
    },
    {
      title: "Lượt đọc",
      dataIndex: "Reads",
      key: "Reads",
      align: 'center',
      render: (_, record, index) => (
        <div>
          {formatNumber(record?.Reads)}
        </div>
      ),
    }
  ]

  return (
    <SpinCustom spinning={loading}>
      <ComicDetailStyled>
        <Row gutter={[16]} className="mb-20">
          <Col span={16} className="mt-15">
            <Row gutter={[16]}>
              <Col span={24}>
                <p className="title-type-2">{comic?.Title}</p>
                <p className="text-center text-gray mb-20">Cập nhật lúc: {moment(comic?.updatedAt).utc(7).format("HH:mm DD/MM/YYYY")}</p>
              </Col>
              <Col span={6}>
                <img style={{ width: '100%' }} src={comic?.AvatarPath} alt="" />
              </Col>
              <Col span={18}>
                <InforComic icon={LstIcons.ICON_USER} title="Tác giả" data={comic?.Author?.FullName} />
                <InforComic icon={LstIcons.ICON_TAGS} title="Thể loại" data={comic?.Genres?.map(i => i?.Title)} />
                <InforComic icon={LstIcons.ICON_PREVIEW} title="Lượt đọc" data={comic?.Reads} />
                <div className="d-flex align-items-center">
                  <ButtonCustom
                    className="greendBackground medium text-white fs-17 mr-20"
                    icon={LstIcons.ICON_LIKE}
                  >
                    Theo dõi
                  </ButtonCustom>
                  <div className="d-flex">
                    <span className="fw-700 mr-8">{comic?.Likes}</span>
                    <span>Lượt theo dõi</span>
                  </div>
                </div>
                <div className="mt-20">
                  <ButtonCircle
                    className="normal"
                    title="Báo cáo"
                    icon={LstIcons.ICON_WARNING}
                    onClick={() => handleReport()}
                  />
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <Rating />
          </Col>
          <Col span={16} className="mb-15">
            <div className="title-type-3 d-flex align-items-center">
              <span>{LstIcons.ICON_INFOR}</span>
              <span>Nội dung</span>
            </div>
            <div className="fs-16 ">
              {
                !showFullDescription ?
                  comic?.ShortDescription?.slice(0, comic?.ShortDescription?.length / 2)
                  :
                  comic?.ShortDescription
              }
              <span
                onClick={() => setShowFullDescription(!showFullDescription)}
                style={{
                  color: "#2980b9",
                  cursor: 'default'
                }}
              >
                {!showFullDescription ? "... Xem thêm" : " Thu gọn"}
              </span>
            </div>
          </Col>
          <Col span={16}>
            <div className="title-type-3 d-flex align-items-center">
              <span>{LstIcons.ICON_MENU}</span>
              <span>Danh sách chương</span>
            </div>
            <Table
              bordered
              columns={column}
              dataSource={comic?.Chapters.sort((a, b) => b.ChapterID - a.ChapterID)}
              pagination={false}
            />
          </Col>
        </Row>
      </ComicDetailStyled>
      {openModal && (
        <ModalReport
          open={openModal}
          onCancel={() => setOpenModal(false)}
        />
      )}
    </SpinCustom>
  )
}

export default ComicDetail