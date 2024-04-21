import express from "express"
const router = express.Router()
import UserController from "../controllers/user.controller.js"
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { Roles } from '../utils/lib.js'
import upload from '../middlewares/clouddinary.middleware.js'
import UserValidation from "../validations/user.validation.js"

router.post("/getListAuthor",
  UserValidation.getListAuthorUser,
  UserController.getListAuthour
)
router.post('/login',
  UserController.login
)
router.post('/loginByGoogle',
  UserController.loginByGoogle
)
router.post('/register',
  // UserValidation.register,
  UserController.register
)
router.post('/registerByGoogle',
  // UserValidation.registerByGoogle,
  UserController.registerByGoogle
)
router.get("/getDetailProfile",
  authMiddleware([Roles.ROLE_ADMIN, Roles.ROLE_AUTHOR, Roles.ROLE_CUSTOMER_NORMAL, Roles.ROLE_CUSTOMER_PREMIUM]),
  UserController.getDetailProfile
)
router.post("/getListUser",
  authMiddleware([Roles.ROLE_ADMIN]),
  UserValidation.getListAuthorUser,
  UserController.getListUser
)
router.get("/deactiveAccount/:UserID",
  authMiddleware([Roles.ROLE_ADMIN]),
  UserValidation.getParamsUserID,
  UserController.deactiveAccount
)
router.post("/updateProfile",
  upload('Avatar').single("Avatar"),
  authMiddleware([Roles.ROLE_AUTHOR, Roles.ROLE_CUSTOMER_NORMAL, Roles.ROLE_CUSTOMER_PREMIUM]),
  UserValidation.updateProfile,
  UserController.updateProfileCustomer
)
router.post("/changePassword",
  authMiddleware([Roles.ROLE_AUTHOR, Roles.ROLE_CUSTOMER_NORMAL, Roles.ROLE_CUSTOMER_PREMIUM, Roles.ROLE_ADMIN]),
  UserValidation.changePassword,
  UserController.changePassword
)
router.post("/followOrUnfollowComic",
  authMiddleware([Roles.ROLE_AUTHOR, Roles.ROLE_CUSTOMER_NORMAL, Roles.ROLE_CUSTOMER_PREMIUM]),
  UserValidation.followOrUnfollowComic,
  UserController.followOrUnfollowComic
)
router.post("/buyPremium",
  authMiddleware([Roles.ROLE_CUSTOMER_NORMAL]),
  UserValidation.buyPremium,
  UserController.buyPremium
)
router.get("/handleExpiredPremium",
  authMiddleware([Roles.ROLE_CUSTOMER_PREMIUM]),
  UserController.handleExpiredPremium
)
router.post("/checkEmail",
  UserValidation.checkEmail,
  UserController.checkEmail
)
router.post("/forgotPassword",
  UserValidation.forgotPassword,
  UserController.forgotPassword
)
router.post("/getDetailAuthor",
  UserValidation.getDetailAuthor,
  UserController.getDetailAuthor
)

export default router
