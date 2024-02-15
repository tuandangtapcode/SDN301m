import express from 'express'
const router = express.Router()
import ComicController from '../controllers/comic.controller.js'
import upload from '../middlewares/clouddinary.middleware.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import Roles from '../utils/roles.js'

router.post('/getAllComics',
  ComicController.getAllComics
)
router.post('/insertComic',
  upload('Avatar').single('Avatar'),
  // authMiddleware([Roles.ROLE_ADMIN, Roles.ROLE_AUTHOR]),
  ComicController.insertComic
)
//Chưa test
router.post('/getDetailComic/:ComicID',
  ComicController.getDetailComic
)
//Chưa test
router.post('/deleteComic',
  // authMiddleware([Roles.ROLE_ADMIN, Roles.ROLE_AUTHOR]),
  ComicController.deleteComic
)
//Chưa test
router.put('/updateComic',
  // upload('Avatar').single('Avatar'),
  // authMiddleware([Roles.ROLE_ADMIN, Roles.ROLE_AUTHOR]),
  ComicController.updateComic
)
//Chưa test
router.post('/getAllComicsByGenre',
  ComicController.getAllComicsByGenre
)
router.post('/getAllComicsByAuthor',
  ComicController.getAllComicsByAuthor
)

export default router
