import http from '../index'
import {
  apiGetAllComics, apiInsertComic,
} from './urls'

const getAllComics = body => http.post(apiGetAllComics, body)
const insertComic = body => http.post(apiInsertComic, body)


const ComicService = {
  getAllComics,
  insertComic
}

export default ComicService
