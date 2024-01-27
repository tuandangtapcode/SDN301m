import ComicService from '../services/comic.service.js'

const getAllComics = async (req, res) => {
  const response = await ComicService.fncGetAllComics(req)
  return res.status(response.StatusCode).json(response)
}

const insertComic = async (req, res) => {
  const response = await ComicService.fncInsertComic(req)
  return res.status(response.StatusCode).json(response)
}


const ComicController = {
  getAllComics,
  insertComic
}

export default ComicController
