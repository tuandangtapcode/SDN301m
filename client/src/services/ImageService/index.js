import http from '../index'
import {
  apiInsertImage,
} from './urls'

const insertImage = body => http.post(apiInsertImage, body, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

const ImageService = {
  insertImage
}

export default ImageService
