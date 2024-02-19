import { useDispatch } from "react-redux"
import ModalCustom from "../ModalCustom"
import { useNavigate } from "react-router-dom"
import globalSlice from "src/redux/globalSlice"
import { Button } from "antd"
import socket from "src/utils/socket"

const DeactiveModal = ({ open, onCancel }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    dispatch(globalSlice.actions.setUser({}))
    socket.disconnect()
    onCancel()
    navigate('/')
  }

  return (
    <ModalCustom
      open={open}
      // onCancel={onCancel}
      title={<div className="text-center">NOTIFICATION</div>}
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
      <p className="fs-18 fw-600">Your account is banned for terms and privacy violations!</p>
    </ModalCustom>
  )
}

export default DeactiveModal