import express from 'express'
const router = express.Router()
import PackageController from '../controllers/package.controller.js'

router.post("/insertPackage",
  PackageController.insertPackage
)
router.post("/updatePackage",
  PackageController.updatePackage
)
router.post("/getAllPackages",
  PackageController.getAllPackages
)
router.get("/getDetailPackage/:PackageID",
  PackageController.getDetailPackage
)

export default router
