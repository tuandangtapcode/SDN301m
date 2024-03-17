import express from 'express'
const router = express.Router()
import PackageController from '../controllers/package.controller.js'
import PackageValidation from '../validations/package.validation.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { Roles } from '../utils/lib.js'

router.post("/insertPackage",
  authMiddleware([Roles.ROLE_ADMIN]),
  PackageValidation.insertPackage,
  PackageController.insertPackage
)
router.post("/updatePackage",
  authMiddleware([Roles.ROLE_ADMIN]),
  PackageController.updatePackage
)
router.post("/getAllPackages",
  PackageController.getAllPackages
)
router.get("/getDetailPackage/:PackageID",
  PackageController.getDetailPackage
)

export default router
