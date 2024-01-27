import express from 'express'
const router = express.Router()
import GenreController from '../controllers/genre.controller.js'

router.get('/getAllGenres',
  GenreController.getAllGenres
)
router.post('/insertGenre',
  GenreController.insertGenre
)
router.post('/updateGenre/:id',
  GenreController.updateGenre
)
router.delete('/deleteGenre/:id',
  GenreController.deleteGenre
)

export default router