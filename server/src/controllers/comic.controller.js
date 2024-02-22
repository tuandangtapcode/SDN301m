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

const changeStatusComic = async (req, res) => {
  try {
    const response = await ComicService.fncChangeStatusComic(req)
    return res.status(response.StatusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const followComic = async (req, res) => {
  try {
    const response = await ComicService.fncFollowComic(req)
    return res.status(response.StatusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const unfollowComic = async (req, res) => {
  try {
    const response = await ComicService.fncUnfollowComic(req)
    return res.status(response.StatusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString());
  }
}

const getAllComicsFollow = async (req, res) => {
  try {
    const response = await ComicService.fncGetAllComicsFollowed(req)
    return res.status(response.StatusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString());
  }
}
const ComicController = {
  getAllComics,
  insertComic,
  deleteComic,
  updateComic,
  getAllComicsByGenre,
  getDetailComic,
  getAllComicsByAuthor,
  changeStatusComic,
  followComic,
  unfollowComic,
  getAllComicsFollow
}

export default ComicController
