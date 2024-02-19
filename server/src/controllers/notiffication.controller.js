import NotificaitonService from "../services/notiffication.service.js"

const createNotification = async (req, res) => {
  try {
    const response = await NotificaitonService.fncCreateNotification(req)
    return res.status(response.StatusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const seenNotification = async (req, res) => {
  try {
    const response = await NotificaitonService.fncSeenNotification(req)
    return res.status(response.StatusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getListNotificationByReceiver = async (req, res) => {
  try {
    const response = await NotificaitonService.fncGetListNotificationByReceiver(req)
    return res.status(response.StatusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}


const NotificaitonController = {
  createNotification,
  seenNotification,
  getListNotificationByReceiver
}

export default NotificaitonController
