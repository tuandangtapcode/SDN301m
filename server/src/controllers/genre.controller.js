import GenreService from '../services/genre.service.js'

const insertGenre = async (req, res) => {
  try {
    const response = await GenreService.fncInsertGenre(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getAllGenres = async (req, res) => {
  try {
    const response = await GenreService.fncGetAllGenres(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const updateGenre = async (req, res) => {
  try {
    const response = await GenreService.fncUpdateGenre(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const deleteGenre = async (req, res) => {
  try {
    const response = await GenreService.fncDeleteGenre(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}


const GenreController = {
  insertGenre,
  getAllGenres,
  updateGenre,
  deleteGenre
}

export default GenreController
