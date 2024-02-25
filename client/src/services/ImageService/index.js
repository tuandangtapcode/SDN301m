import http from '../index'
import {
apiGetAllImagesByChapter,
  apiInsertImage,
} from './urls'

const insertImage = body => http.post(apiInsertImage, body, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
const getAllImagesByChapter = body => http.post(apiGetAllImagesByChapter, body)


const ImageService = {
  insertImage,
  getAllImagesByChapter
}

export default ImageService
