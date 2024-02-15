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
//Chưa test
router.post('/getDetailComic',
  ComicController.getComicDetail
)
//Chưa test
router.delete('/deleteComic',
  ComicController.deleteComic
)
//Chưa test
router.put('/updateComic',
  ComicController.updateComic
)
//Chưa test
router.post('/getAllComicsbyGenre',
  ComicController.getAllComicsByGenre
)

export default router
