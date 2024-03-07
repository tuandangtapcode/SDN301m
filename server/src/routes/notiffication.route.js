import express from "express"
const router = express.Router()
import NotificaitonController from "../controllers/notiffication.controller.js"
import NotificaitonValidation from "../validations/notification.validation.js"

router.post('/createNotification',
  NotificaitonValidation.insertNotificaiton,
  NotificaitonController.createNotification
)
router.get('/seenNotification/:UserID',
  NotificaitonValidation.getParamsUserID,
  NotificaitonController.seenNotification
)
router.get('/getListNotificationByReceiver/:UserID',
  NotificaitonValidation.getParamsUserID,
  NotificaitonController.getListNotificationByReceiver
)

export default router
