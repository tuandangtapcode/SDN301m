import express from "express"
const router = express.Router()
import NotificaitonController from "../controllers/notiffication.controller.js"

router.post('/createNotification',
  NotificaitonController.createNotification
)
router.get('/seenNotification/:UserID',
  NotificaitonController.seenNotification
)
router.get('/getListNotificationByReceiver/:UserID',
  NotificaitonController.getListNotificationByReceiver
)

export default router
