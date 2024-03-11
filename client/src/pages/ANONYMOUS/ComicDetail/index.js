import { Button, Col, Row, Table, message } from "antd"
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
import { useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import { toast } from "react-toastify"
import ModalReport from "./components/ModalReport"
import ConfirmModal from "src/components/ModalCustom/ConfirmModal"
import CommentItem from "./components/CommentItem"
import InputCustom from "src/components/FloatInput/InputCustom"
import CommentService from "src/services/CommentService"
import UserService from "src/services/UserService"
import socket from "src/utils/socket"


const ComicDetail = () => {

  const { ComicID } = useParams()
  const navigate = useNavigate()
  const global = useSelector(globalSelector)
  const [loading, setLoading] = useState()
  const [comic, setComic] = useState()
  const [comments, setComments] = useState([])
  const [totalChapter, setTotalChapter] = useState(0)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [openBtnComment, setOpenBtnComment] = useState(false)
  const [textComment, setTextComment] = useState("")
  const [statusBtnFollow, setStatusBtnFollow] = useState(global?.user?.Follows?.some(i => i?._id === ComicID))
  const [openModalReport, setOpenModalReport] = useState(false)

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

  const getComments = async () => {
    try {
      setLoading(true)
      const res = await CommentService.getAllCommentByComic(ComicID)
      if (res?.isError) return navigate('/not-found')
      setComments(res?.data?.List)
    } finally {
      setLoading(false)
    }
  }

  const handleSendComment = async () => {
    try {
      setLoading(true)
      const res = await CommentService.insertComment({ Comic: ComicID, Content: textComment })
      if (res?.isError) return
      socket.emit("send-comment",
        {
          Author: { FullName: global?.user?.FullName, AvatarPath: global?.user?.AvatarPath },
          Comic: ComicID,
          Content: textComment
        })
    } finally {
      setLoading(false)
    }
  }

  const handleFollowOrUnFollowComic = async () => {
    try {
      setLoading(true)
      const res = await UserService.followOrUnfollowComic({ ComicID })
      if (res?.isError) return
      toast.success(res?.msg)
      setStatusBtnFollow(!statusBtnFollow)
      getComic()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!!ComicID) {
      getComic()
      getComments()
    }
  }, [ComicID])

  socket.on("get-comments", data => {
    if (data?.Comic === ComicID) {
      setComments([...comments, data])
    }
  })


  const column = [
    {
      title: "Số chương",
      dataIndex: "Name",
      key: "Name",
      align: 'center',
      render: (_, record, index) => (
        <div
          className="cursor-pointer chapter-link"
          onClick={() => {
            if (record?.ChapterID > 2) {
              if (!global?.user?._id || global?.user?.RoleID === 5) {
                ConfirmModal({
                  title: `Mua premium để có thể đọc nhiều chapter hơn`,
                  okText: "Mua premium",
                  cancelText: "Hủy",
                  onOk: async close => {
                    navigate('/premium')
                    close()
                  },
                })
              } else {
                navigate(`/comic/${comic?._id}/chapter/${record?.ChapterID}`)
              }
            } else {
              navigate(`/comic/${comic?._id}/chapter/${record?.ChapterID}`)
            }
          }}
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
                    loading={loading}
                    onClick={() => {
                      if (global?.user?._id) {
                        handleFollowOrUnFollowComic()
                      } else {
                        ConfirmModal({
                          title: `Hãy đăng nhập để có thể follow truyện`,
                          okText: "Đăng nhập",
                          cancelText: "Hủy",
                          onOk: async close => {
                            navigate('/login')
                            close()
                          },
                        })
                      }
                    }}
                  >
                    {
                      !!statusBtnFollow
                        ? "Bỏ theo dõi"
                        : "Theo dỗi"
                    }
                  </ButtonCustom>
                  <div className="d-flex">
                    <span className="fw-700 mr-8">{comic?.Likes}</span>
                    <span>Lượt theo dõi</span>
                  </div>
                </div>
                <div className="mt-20">
                  <Button
                    icon={LstIcons.ICON_WARNING}
                    className="greendBorder medium"
                    onClick={() => setOpenModalReport(comic)}
                  >
                    Báo cáo
                  </Button>
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
          <Col span={16}>
            <div className="title-type-3 d-flex align-items-center">
              <span>{LstIcons.ICON_MESSAGE}</span>
              <span>Bình luận</span>
            </div>
            <div className="mt-20 mb-12" style={{ backgroundColor: '#ebebeb' }}>
              <InputCustom
                textArea
                label="Thêm bình luận"
                style={{ height: '100px' }}
                onChange={e => setTextComment(e.target.value)}
                onFocus={() => {
                  if (!!global?.user?._id) {
                    setOpenBtnComment(true)
                  } else {
                    message.error("Hãy đăng nhập để bình luận")
                  }
                }}
              />
            </div>
            <div className={!!openBtnComment ? "d-flex-end mb-16" : "d-none"}>
              <Button
                onClick={() => setOpenBtnComment(false)}
              >
                Hủy
              </Button>
              <Button
                className="ml-12"
                type="primary"
                loading={loading}
                onClick={() => handleSendComment()}
              >
                Gửi
              </Button>
            </div>
            <div className="mt-20">
              {
                comments?.map(i =>
                  <CommentItem comment={i} />
                )
              }
            </div>
          </Col>
        </Row>
      </ComicDetailStyled>
      {openModalReport && (
        <ModalReport
          open={openModalReport}
          onCancel={() => setOpenModalReport(false)}
        />
      )}
    </SpinCustom>
  )
}

export default ComicDetail