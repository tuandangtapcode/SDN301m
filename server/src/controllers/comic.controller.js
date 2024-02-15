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

const getComicDetail = async (req, res) => {
  try {
    const response = await comicService.fncGetComicDetail(req)
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
  getComicDetail
}

export default ComicController
