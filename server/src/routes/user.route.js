import express from "express"
const router = express.Router()
import UserController from "../controllers/user.controller.js"
import { authMiddleware } from '../middlewares/auth.middleware.js'
import Roles from '../utils/roles.js'
import upload from '../middlewares/clouddinary.middleware.js'
import UserValidation from "../validations/user.validation.js"

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
router.get("/getDetailProfile/:UserID",
  UserController.getDetailProfile
)
router.get("/getDetailAuthour",
  UserController.getDetailAuthour
)
router.post("/login",
  UserController.login
)
router.post("/register",
  UserController.register
)
router.get("/getListUser",
  // authMiddleware([Roles.ROLE_ADMIN]),
  UserController.getListUser
)
router.get("/deactiveAccount/:UserID",
  // authMiddleware([Roles.ROLE_ADMIN]),
  UserController.deactiveAccount
)
router.post("/updateProfile",
  upload('Avatar').single("Avatar"),
  authMiddleware([Roles.ROLE_AUTHOR, Roles.ROLE_CUSTOMER_NORMAL, Roles.ROLE_CUSTOMER_PREMIUM]),
  UserValidation.updateProfile,
  UserController.updateProfileCustomer
)
router.post("/changePassword",
  // authMiddleware([Roles.ROLE_AUTHOR, Roles.ROLE_CUSTOMER_NORMAL, Roles.ROLE_CUSTOMER_PREMIUM]),
  UserController.changePassword
)

export default router
