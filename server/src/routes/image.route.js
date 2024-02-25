import express from 'express'
const router = express.Router()
import ImageController from '../controllers/image.controller.js'
import upload from '../middlewares/clouddinary.middleware.js'

router.post('/insertImage',
  upload('Comic').single('Image'),
  ImageController.insertImage
)
router.post('/getAllImagesByChapter',
  ImageController.getImagesByChapter
)

export default router