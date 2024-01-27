import GenreService from '../services/genre.service.js'

const insertGenre = async (req, res) => {
  const response = await GenreService.fncInsertGenre(req)
  return res.status(response.StatusCode).json(response)
}

const getAllGenres = async (req, res) => {
  const response = await GenreService.fncGetAllGenres(req)
  return res.status(response.StatusCode).json(response)
}

const updateGenre = async (req, res) => {
  const response = await GenreService.fncUpdateGenre(req)
  return res.status(response.StatusCode).json(response)
}

const deleteGenre = async (req, res) => {
  const response = await GenreService.fncDeleteGenre(req)
  return res.status(response.StatusCode).json(response)
}


const GenreController = {
  insertGenre,
  getAllGenres,
  updateGenre,
  deleteGenre
}

export default GenreController
