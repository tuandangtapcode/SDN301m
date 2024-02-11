import express from 'express'
const router = express.Router()
import GenreController from '../controllers/genre.controller.js'
import { authAdminMidleware } from '../middlewares/auth.middleware.js'

router.get('/getAllGenres',
  GenreController.getAllGenres
)
router.post('/insertGenre',
  // authAdminMidleware,
  GenreController.insertGenre
)
router.post('/updateGenre',
  // authAdminMidleware,
  GenreController.updateGenre
)
router.delete('/deleteGenre/:id',
  // authAdminMidleware,
  GenreController.deleteGenre
)

export default router