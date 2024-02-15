import express from 'express'
const router = express.Router()
import ComicController from '../controllers/comic.controller.js'
import upload from '../middlewares/clouddinary.middleware.js'

router.post('/getAllComics',
  ComicController.getAllComics
)
router.post('/insertComic',
  upload('Avatar').single('Avatar'),
  ComicController.insertComic
)
router.post('/insertComic',
  upload('Avatar').single('Avatar'),
  ComicController.updateComic
)

export default router
