import ComicService from '../services/comic.service.js'

const getAllComics = async (req, res) => {
  try {
    const response = await ComicService.fncGetAllComics(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getAllComicsByGenre = async (req, res) => {
  try {
    const response = await ComicService.fncGetAllComicsByGenres(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const insertComic = async (req, res) => {
  try {
    const response = await ComicService.fncInsertComic(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const deleteComic = async (req, res) => {
  try {
    const response = await ComicService.fncDeleteComic(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const updateComic = async (req, res) => {
  try {
    const response = await ComicService.fncUpdateComic(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getDetailComic = async (req, res) => {
  try {
    const response = await ComicService.fncGetDetailComic(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const changeStatusComic = async (req, res) => {
  try {
    const response = await ComicService.fncChangeStatusComic(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getAllChaptersByComic = async (req, res) => {
  try {
    const response = await ComicService.fncGetAllChaptersByComic(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getAllHotComics = async (req, res) => {
  try {
    const response = await ComicService.fncGetAllHotComics(req)
    return res.status(response.statusCode).json(response)
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
  changeStatusComic,
  getAllChaptersByComic,
  getAllHotComics
}

export default ComicController
