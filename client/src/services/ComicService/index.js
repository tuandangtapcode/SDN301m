import http from '../index'
import {
  apiDeleteComic,
  apiGetAllComics,
  apiGetAllComicsByAuthor,
  apiGetAllComicsByGenre,
  apiInsertComic,
  apiUpdateComic,
} from './urls'

const getAllComics = body => http.post(apiGetAllComics, body)
const insertComic = body => http.post(apiInsertComic, body, {
  headers: {
    'Content-Type': 'multipart/form-data',
    'token': `Bearer ${localStorage.getItem('token')}`
  }
})
const udpateComic = body => http.post(apiUpdateComic, body, {
  headers: {
    'Content-Type': 'multipart/form-data',
    'token': `Bearer ${localStorage.getItem('token')}`
  }
})
const getDetailComic = ComicID => http.get(`${apiGetAllComics}/${ComicID}`)
const deleteComic = body => http.post(apiDeleteComic, body)
const getAllComicsByGenre = body => http.post(apiGetAllComicsByGenre, body)
const getAllComicsByAuthor = body => http.post(apiGetAllComicsByAuthor, body)


const ComicService = {
  getAllComics,
  insertComic,
  udpateComic,
  getDetailComic,
  deleteComic,
  getAllComicsByGenre,
  getAllComicsByAuthor
}

export default ComicService
