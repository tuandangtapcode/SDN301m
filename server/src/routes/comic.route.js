import express from 'express'
const router = express.Router()
import ComicController from '../controllers/comic.controller.js'
import upload from '../middlewares/clouddinary.middleware.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { Roles } from '../utils/lib.js'
import ComicValidation from '../validations/comic.validation.js'

router.post('/getAllComics',
  ComicValidation.getAllComics,
  ComicController.getAllComics
)
router.post('/insertComic',
  upload('Avatar').single('Avatar'),
  authMiddleware([Roles.ROLE_ADMIN, Roles.ROLE_AUTHOR]),
  ComicValidation.insertComic,
  ComicController.insertComic
)
router.get('/getDetailComic/:ComicID',
  ComicValidation.getParamsComicID,
  ComicController.getDetailComic
)
// router.post('/deleteComic',
//   authMiddleware([Roles.ROLE_ADMIN, Roles.ROLE_AUTHOR]),
//   ComicController.deleteComic
// )
router.put('/updateComic',
  upload('Avatar').single('Avatar'),
  authMiddleware([Roles.ROLE_ADMIN, Roles.ROLE_AUTHOR]),
  ComicValidation.updateComic,
  ComicController.updateComic
)
router.post('/getAllComicsByGenre',
  ComicValidation.getAllComicsByGenre,
  ComicController.getAllComicsByGenre
)
router.post('/changeStatusComic',
  authMiddleware([Roles.ROLE_ADMIN]),
  ComicValidation.changeStatusComic,
  ComicController.changeStatusComic
)
router.get('/getAllChaptersByComic/:ComicID',
  ComicValidation.getParamsComicID,
  ComicController.getAllChaptersByComic
)
router.get("/getAllHotComics/:FillNumber",
  ComicValidation.getAllHotComics,
  ComicController.getAllHotComics
)

export default router
