import http from '../index'
import {
  apiCreateNotification,
  apiGetListNotificationByReceiver,
  apiSeenNotification
} from './urls'

const createNotification = body => http.post(apiCreateNotification, body)
const seenNotification = UserID => http.get(`${apiSeenNotification}/${UserID}`)
const getListNotificationByReceiver = UserID => http.get(`${apiGetListNotificationByReceiver}/${UserID}`)

const NotificaitonService = {
  createNotification,
  seenNotification,
  getListNotificationByReceiver
}

export default NotificaitonService
