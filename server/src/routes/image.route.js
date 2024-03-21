import express from 'express'
const router = express.Router()
import ImageController from '../controllers/image.controller.js'
import upload from '../middlewares/clouddinary.middleware.js'
import ImageValidation from '../validations/image.validation.js'

router.post('/insertImage',
  upload('Comic').single('Image'),
  // ImageValidation.insertImage,
  ImageController.insertImage
)
router.post('/getAllImagesByChapter',
  ImageValidation.getAllImagesByChapter,
  ImageController.getImagesByChapter
)
router.get("/getImagesByComic/:ComicID",
  ImageController.getImagesByComic
)

export default router