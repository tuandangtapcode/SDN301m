import { useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import { ImageStyled, UserProfileStyled } from "./styled"
import { AiFillEdit } from "react-icons/ai"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import { useState } from "react"
import UpdateProfile from "./components/UpdateProfile"
import LstIcons from "src/components/ListIcons"

const UserProfile = () => {

  const global = useSelector(globalSelector)
  const [modalUpdateProfile, setModalUpdateProfile] = useState(false)

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