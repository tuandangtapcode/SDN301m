import Image from '../models/image.js'
import response from "../utils/response-result.js"

const fncInsertImage = async (req) => {
  try {
    const newImage = await Image.create({
      Image: req.file.path,
      ImageId: req.file.filename,
      Comic: req.body.Comic,
      Chapter: req.body.Chapter,
      SortOrder: req.body.SortOrder
    })
    return response(newImage, false, "Thêm content thành công", 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const ImageService = {
  fncInsertImage
}

export default ImageService
