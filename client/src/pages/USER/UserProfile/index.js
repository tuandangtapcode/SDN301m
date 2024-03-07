import { useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import { ImageStyled, UserProfileStyled } from "./styled"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import { useState } from "react"
import UpdateProfile from "./components/UpdateProfile"
import LstIcons from "src/components/ListIcons"
import ComicItemList from "src/components/ComicItemList"
import { Col, Row } from "antd"
import { useNavigate } from "react-router-dom"

const UserProfile = () => {

  const global = useSelector(globalSelector)
  const [modalUpdateProfile, setModalUpdateProfile] = useState(false)
  const navigate = useNavigate()

  return (
    <UserProfileStyled>
      <div className="d-flex">
        <div className="avatar mr-20">
          <ImageStyled src={global?.user?.AvatarPath} alt="" />
        </div>
        <div className="full-name d-flex">
          <p className="fs-25 fw-600 mr-8">{global?.user?.FullName}</p>
          <ButtonCustom
            className="fs-22"
            icon={LstIcons.ICON_EDIt}
            onClick={() => setModalUpdateProfile(true)}
          />
        </div>
      </div>
      {
        !!global?.user?.Follows.length &&
        <div className="mt-30">
          <h2 className="mb-16">Danh sách truyện theo dõi:</h2>
          <Row gutter={[16, 0]}>
            {
              global?.user?.Follows?.map(i =>
                <Col span={6} onClick={() => navigate(`/comic/${i?._id}`)}>
                  <ComicItemList comic={i} />
                </Col>
              )
            }
          </Row>
        </div>
      }
      {
        !!modalUpdateProfile &&
        <UpdateProfile
          open={modalUpdateProfile}
          onCancel={() => setModalUpdateProfile(false)}
        />
      }
    </UserProfileStyled>
  )
}

export default UserProfile