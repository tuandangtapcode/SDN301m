import express from 'express'
const router = express.Router()
import ImageController from '../controllers/image.controller.js'
import upload from '../middlewares/clouddinary.middleware.js'

router.post('/insertImage',
  upload('Comic').single('Image'),
  ImageController.insertImage
)

router.post('/getChapter',
  ImageController.getImageByChapter
)
export default router