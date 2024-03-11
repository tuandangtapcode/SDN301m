import http from '../index'
import {
  apiCreateNotification,
  apiGetListNotificationByReceiver,
  apiSeenNotification
} from './urls'

const createNotification = body => http.post(apiCreateNotification, body, {
  headers: {
    'token': `Bearer ${localStorage.getItem('token')}`
  }
})
const seenNotification = () => http.get(apiSeenNotification, {
  headers: {
    'token': `Bearer ${localStorage.getItem('token')}`
  }
})
const getListNotificationByReceiver = () => http.get(apiGetListNotificationByReceiver, {
  headers: {
    'token': `Bearer ${localStorage.getItem('token')}`
  }
})


const NotificaitonService = {
  createNotification,
  seenNotification,
  getListNotificationByReceiver
}

export default NotificaitonService
