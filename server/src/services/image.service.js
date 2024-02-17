import Image from '../models/image.js'
import response from "../utils/response-result.js"

const fncInsertImage = async (req) => {
  try {
    const newImage = await Image.create({
      Image: req.file.path,
      ImageName: req.file.filename,
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

const fncUpdateImage = async (req) => {
  try {
    const newImage = await Image.findByIdAndUpdate({ _id: req.body.id }, {
      Image: req.file.path,
      ImageName: req.file.filename,
      ImageId: req.file.filename,
      Comic: req.body.Comic,
      Chapter: req.body.Chapter,
      SortOrder: req.body.SortOrder
    })
    return response(newImage, false, "Cập nhật content thành công", 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetAllImagesByChapter = async (req) =>{
  try {
    const {ComicID, Chapter} = req.body
    const image = await Image.find({
      Comic: { $elemMatch: ComicID },
      Chapter: { $elemMatch: Chapter}
    })
    .populate('Comic', ['Title'])
    return response(
      { List: image, Total: image.length },
      false,
      'Lấy data thành công',
      200
    )
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const ImageService = {
  fncInsertImage,
  fncUpdateImage,
  fncGetAllImagesByChapter,
}

export default ImageService
