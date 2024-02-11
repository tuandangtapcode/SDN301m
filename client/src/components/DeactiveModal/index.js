import { useDispatch } from "react-redux"
import ModalCustom from "../ModalCustom"
import { useNavigate } from "react-router-dom"
import globalSlice from "src/redux/globalSlice"
import { Button } from "antd"

const DeactiveModal = ({ open, onCancel }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  console.log('open', open);
  const handleLogout = () => {
    localStorage.removeItem('token')
    dispatch(globalSlice.actions.setUser({}))
    onCancel()
    navigate('/')
  }

  return (
    <ModalCustom
      open={open}
      // onCancel={onCancel}
      title="Notification of locked account"
      width="40vw"
      footer={
        <div className="d-flex-end">
          <Button
            className="greendBorder small"
            onClick={() => handleLogout()}
          >
            Cancel
          </Button>
        </div>
      }
    >
      <p className="fs-18 fw-600">YOUR ACCOUNT IS BANNED FOR TERMS AND PRIVACY VIOLAIONS!</p>
    </ModalCustom>
  )
}

export default DeactiveModal