import express from "express"
const router = express.Router()
import NotificaitonController from "../controllers/notiffication.controller.js"
import NotificaitonValidation from "../validations/notification.validation.js"
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { Roles } from '../utils/lib.js'

router.post('/createNotification',
  authMiddleware([Roles.ROLE_AUTHOR, Roles.ROLE_CUSTOMER_NORMAL, Roles.ROLE_CUSTOMER_PREMIUM, Roles.ROLE_ADMIN]),
  NotificaitonValidation.insertNotificaiton,
  NotificaitonController.createNotification
)
router.get('/seenNotification',
  authMiddleware([Roles.ROLE_AUTHOR, Roles.ROLE_CUSTOMER_NORMAL, Roles.ROLE_CUSTOMER_PREMIUM, Roles.ROLE_ADMIN]),
  NotificaitonController.seenNotification
)
router.get('/getListNotificationByReceiver',
  authMiddleware([Roles.ROLE_AUTHOR, Roles.ROLE_CUSTOMER_NORMAL, Roles.ROLE_CUSTOMER_PREMIUM, Roles.ROLE_ADMIN]),
  NotificaitonController.getListNotificationByReceiver
)

export default router
