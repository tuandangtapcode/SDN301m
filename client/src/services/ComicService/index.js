import http from '../index'
import {
  apiChangeStatusComic,
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
const deleteComic = body => http.post(apiDeleteComic, body, {
  headers: {
    'token': `Bearer ${localStorage.getItem('token')}`
  }
})
const getAllComicsByGenre = body => http.post(apiGetAllComicsByGenre, body)
const getAllComicsByAuthor = body => http.post(apiGetAllComicsByAuthor, body)
const changeStatusComic = body => http.post(apiChangeStatusComic, body, {
  headers: {
    'token': `Bearer ${localStorage.getItem('token')}`
  }
})


const ComicService = {
  getAllComics,
  insertComic,
  udpateComic,
  getDetailComic,
  deleteComic,
  getAllComicsByGenre,
  getAllComicsByAuthor,
  changeStatusComic
}

export default ComicService
