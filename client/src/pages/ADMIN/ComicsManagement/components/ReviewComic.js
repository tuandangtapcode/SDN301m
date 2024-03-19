import { Button, Col, Image, Row } from "antd";
import { useEffect, useState } from "react";
import ModalCustom from "src/components/ModalCustom"
import ImageService from "src/services/ImageService";

const ReviewComic = ({ open, onCancel }) => {

  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([])

  const getAllImages = async () => {
    try {
      setLoading(true)
      const res = await ImageService.getAllImagesByComic(open?._id)
      if (res?.isError) return
      setImages(res?.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!!open?._id) getAllImages()
  }, [open?._id])


  return (
    <ModalCustom
      open={open}
      onCancel={onCancel}
      title="Review truyện"
      width="80vw"
      footer={
        <div className="d-flex-end">
          <Button
            className="greendBorder small"
            onClick={() => onCancel()}
          >
            Đóng
          </Button>
        </div>
      }
    >
      <Row gutter={[16, 8]}>
        <Col span={5}>
          <Image src={open?.AvatarPath} />
        </Col>
        <Col span={19}>
          <p className="fs-20 fw-600 mb-12">{open?.Title}</p>
          <p className="fs-16 mb-12">{open?.ShortDescription}</p>
          <p>
            {
              open?.Genres?.map(i =>
                <span className="text-blue mr-8 fs-16">{i?.Title}</span>
              )
            }
          </p>
        </Col>
        <Col span={24}>
          {
            open?.Chapters?.map(i =>
              <div className="mb-12">
                <p className="fs-16 mb-8">{i?.Name}</p>
                <div className="d-flex-sb">
                  {
                    images?.map(img =>
                      img?.Chapter === i?.ChapterID &&
                      <Image style={{ width: '200px', height: '200px' }} src={img?.Image} />
                    )
                  }
                </div>
              </div>
            )
          }
        </Col>
      </Row>
    </ModalCustom>
  )
}

export default ReviewComic