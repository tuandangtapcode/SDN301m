import express from 'express'
const router = express.Router()
import GenreController from '../controllers/genre.controller.js'
import { authAdminMidleware } from '../middlewares/auth.middleware.js'
import GenreValidation from '../validations/genre.validation.js'

router.post('/getAllGenres',
  GenreController.getAllGenres
)
router.post('/insertGenre',
  // authAdminMidleware,
  // GenreValidation.insertGenre,
  GenreController.insertGenre
)
router.post('/updateGenre',
  // authAdminMidleware,
  // GenreValidation.updateGenre,
  GenreController.updateGenre
)
router.delete('/deleteGenre/:id',
  // authAdminMidleware,
  GenreController.deleteGenre
)

router.get('/getDetailGenre/:id',
  GenreController.getDetailGenre
)

export default router