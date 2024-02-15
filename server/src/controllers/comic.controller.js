import ComicService from '../services/comic.service.js'

const getAllComics = async (req, res) => {
  const response = await ComicService.fncGetAllComics(req)
  return res.status(response.StatusCode).json(response)
}

const getAllComicsByGenre = async (req, res) => {
  try {
    const response = await ComicService.fncGetAllComicsByGenres(req)
    return res.status(response.StatusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getAllComicsByAuthor = async (req, res) => {
  try {
    const response = await ComicService.fncGetAllComicsByAuthor(req)
    return res.status(response.StatusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const insertComic = async (req, res) => {
  const response = await ComicService.fncInsertComic(req)
  return res.status(response.StatusCode).json(response)
}

const deleteComic = async (req, res) => {
  try {
    const response = await ComicService.fncDeleteComic(req)
    return res.status(response.StatusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const updateComic = async (req, res) => {
  try {
    const response = await ComicService.fncUpdateComic(req)
    return res.status(response.StatusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getDetailComic = async (req, res) => {
  try {
    const response = await ComicService.fncGetDetailComic(req)
    return res.status(response.StatusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}
const ComicController = {
  getAllComics,
  insertComic,
  deleteComic,
  updateComic,
  getAllComicsByGenre,
  getDetailComic,
  getAllComicsByAuthor
}

export default ComicController
