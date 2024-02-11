import express from "express"
const router = express.Router()
import UserController from "../controllers/user.controller.js"
import { authUsernMidleware, authAdminMidleware } from "../middlewares/auth.middleware.js"
import upload from '../middlewares/clouddinary.middleware.js'

router.post("/getListAuthor",
  UserController.getListAuthour
)
router.post('/login',
  UserController.login
)
router.post('/loginByGoogle',
  UserController.loginByGoogle
)
router.post('/register',
  UserController.register
)
router.post('/registerByGoogle',
  UserController.registerByGoogle
)
router.post("/getDetailProfile",
  // authUsernMidleware,
  UserController.getDetailProfile
)
router.post("/login",
  UserController.login
)
router.post("/register",
  UserController.register
)
router.get("/getListUser",
  // authAdminMidleware,
  UserController.getListUser
)
router.get("/deactiveAccount/:id",
  // authAdminMidleware,
  UserController.deactiveAccount
)
router.post("/updateProfile",
  upload('Avatar').single("Avatar"),
  // authUsernMidleware,
  UserController.updateProfileCustomer
)
router.post("/changePassword",
  // authUsernMidleware,
  UserController.changePassword
)

export default router
