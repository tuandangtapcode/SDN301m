import express from 'express'
const router = express.Router()
import ComicController from '../controllers/comic.controller.js'

router.post('/getAllComics',
  ComicController.getAllComics
)
router.post('/insertComic',
  ComicController.insertComic
)

export default router
