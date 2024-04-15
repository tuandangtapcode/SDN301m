import http from '../index'
import {
  apiChangeStatusComic,
  apiDeleteComic,
  apiGetAllChaptersByComic,
  apiGetAllComics,
  apiGetAllComicsByGenre,
  apiGetAllHotComics,
  apiGetDetailComic,
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
const udpateComic = body => http.put(apiUpdateComic, body, {
  headers: {
    'Content-Type': 'multipart/form-data',
    'token': `Bearer ${localStorage.getItem('token')}`
  }
})
const getDetailComic = ComicID => http.get(`${apiGetDetailComic}/${ComicID}`)
const deleteComic = body => http.post(apiDeleteComic, body, {
  headers: {
    'token': `Bearer ${localStorage.getItem('token')}`
  }
})
const getAllComicsByGenre = body => http.post(apiGetAllComicsByGenre, body)
const changeStatusComic = body => http.post(apiChangeStatusComic, body, {
  headers: {
    'token': `Bearer ${localStorage.getItem('token')}`
  }
})
const getAllChaptersByComic = ComicID => http.get(`${apiGetAllChaptersByComic}/${ComicID}`)
const getAllHotComics = FillNumber => http.get(`${apiGetAllHotComics}/${FillNumber}`)


const ComicService = {
  getAllComics,
  insertComic,
  udpateComic,
  getDetailComic,
  deleteComic,
  getAllComicsByGenre,
  changeStatusComic,
  getAllChaptersByComic,
  getAllHotComics
}

export default ComicService
