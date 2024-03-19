import http from '../index'
import {
  apiGetAllImagesByChapter,
  apiGetAllImagesByComic,
  apiInsertImage,
} from './urls'

const insertImage = body => http.post(apiInsertImage, body, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
const getAllImagesByChapter = body => http.post(apiGetAllImagesByChapter, body)
const getAllImagesByComic = ComicID => http.get(`${apiGetAllImagesByComic}/${ComicID}`)


const ImageService = {
  insertImage,
  getAllImagesByChapter,
  getAllImagesByComic
}

export default ImageService
