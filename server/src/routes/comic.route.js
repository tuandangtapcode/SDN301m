import express from 'express'
const router = express.Router()
import ComicController from '../controllers/comic.controller.js'
import upload from '../middlewares/clouddinary.middleware.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { Roles } from '../utils/lib.js'

router.post('/getAllComics',
  ComicController.getAllComics
)
router.post('/insertComic',
  upload('Avatar').single('Avatar'),
  // authMiddleware([Roles.ROLE_ADMIN, Roles.ROLE_AUTHOR]),
  ComicController.insertComic
)
router.get('/getDetailComic/:ComicID',
  ComicController.getDetailComic
)
router.post('/deleteComic',
  // authMiddleware([Roles.ROLE_ADMIN, Roles.ROLE_AUTHOR]),
  ComicController.deleteComic
)
router.put('/updateComic',
  upload('Avatar').single('Avatar'),
  // authMiddleware([Roles.ROLE_ADMIN, Roles.ROLE_AUTHOR]),
  ComicController.updateComic
)
router.post('/getAllComicsByGenre',
  ComicController.getAllComicsByGenre
)
router.post('/getAllComicsByAuthor',
  ComicController.getAllComicsByAuthor
)
router.post('/changeStatusComic',
  // authMiddleware([Roles.ROLE_ADMIN]),
  ComicController.changeStatusComic
)
router.get('/getAllChaptersByComic/:ComicID',
  ComicController.getAllChaptersByComic
)
router.get('/likeComic/:ComicID',
  ComicController.likeComic
)
router.get("/getAllHotComics/:FillNumber",
  ComicController.getAllHotComics
)

export default router
