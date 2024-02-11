import http from '../index'
import {
  apiDeleteGenre,
  apiGetAllGenres, apiInsertGenre, apiUpdateGenre,
} from './urls'

const getAllGenres = () => http.get(apiGetAllGenres)
const insertGenre = body => http.post(apiInsertGenre, body, {
  headers: {
    'Content-Type': 'multipart/form-data',
    'token': `Bearer ${localStorage.getItem('token')}`
  }
})
const updateGenre = body => http.post(apiUpdateGenre, body, {
  headers: {
    'Content-Type': 'multipart/form-data',
    'token': `Bearer ${localStorage.getItem('token')}`
  }
})
const deleteGenre = id => http.delete(`${apiDeleteGenre}/${id}`, {
  headers: {
    'token': `Bearer ${localStorage.getItem('token')}`
  }
})


const GenreService = {
  getAllGenres,
  insertGenre,
  updateGenre,
  deleteGenre
}

export default GenreService
