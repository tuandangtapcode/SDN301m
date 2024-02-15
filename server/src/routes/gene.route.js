import express from 'express'
const router = express.Router()
import GenreController from '../controllers/genre.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import Roles from '../utils/roles.js'
import GenreValidation from '../validations/genre.validation.js'

router.post('/getAllGenres',
  GenreController.getAllGenres
)
router.post('/insertGenre',
  // authMiddleware([Roles.ROLE_ADMIN]),
  // GenreValidation.insertGenre,
  GenreController.insertGenre
)
router.post('/updateGenre',
  authMiddleware([Roles.ROLE_ADMIN]),
  // GenreValidation.updateGenre,
  GenreController.updateGenre
)
router.delete('/deleteGenre/:id',
  // authMiddleware([Roles.ROLE_ADMIN]),
  GenreController.deleteGenre
)

router.get('/getDetailGenre/:id',
  GenreController.getDetailGenre
)

export default router