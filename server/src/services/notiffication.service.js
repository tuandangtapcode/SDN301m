import Notificaiton from "../models/notiffication.js"
import User from '../models/user.js'
import { response } from "../utils/lib.js"

const fncCreateNotification = async (req) => {
  try {
    const { Receiver } = req.body
    let AdminID, notification
    if (!Receiver) {
      const admin = await User.findOne({ RoleID: 1 })
      AdminID = admin._id
      notification = await Notificaiton.create({ ...req.body, Receiver: AdminID })
    } else {
      notification = await Notificaiton.create(req.body)
    }
    return response(notification, false, "Thêm mới thành công", 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncSeenNotification = async (req) => {
  try {
    const UserID = req.params.UserID
    const notification = await Notificaiton.updateMany({ Receiver: UserID }, { IsSeen: true })
    return response(notification, false, "Seen", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetListNotificationByReceiver = async (req) => {
  try {
    const UserID = req.params.UserID
    const notifications = await Notificaiton
      .find({ Receiver: UserID })
      .populate('Sender', ['_id', 'FullName', 'RoleID'])
      .populate('Receiver', ['_id', 'FullName'])
    const notificationsNotSeen = notifications.filter(i => !i.IsSeen)
    return response(
      { List: notifications.reverse(), NotSeen: notificationsNotSeen.length },
      false,
      "Lấy data thành công",
      200
    )
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}


const NotificaitonService = {
  fncCreateNotification,
  fncSeenNotification,
  fncGetListNotificationByReceiver
}

export default NotificaitonService
