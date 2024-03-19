import Image from '../models/image.js'
import Comic from '../models/comic.js'
import { response } from "../utils/lib.js"

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

const fncGetAllImagesByChapter = async (req) => {
  try {
    const { ComicID, Chapter, Date } = req.body
    const updateComic = await Comic
      .updateOne({ _id: ComicID, "Chapters.ChapterID": Chapter }, {
        $inc: {
          "Chapters.$.Reads": 1,
          Reads: 1
        },
        $push: { ReadedAt: Date }
      })
    if (!updateComic.matchedCount) return response(updateComic, true, "Có lỗi", 200)
    const image = await Image
      .find({ Comic: ComicID, Chapter: Chapter })
      .sort({ "SortOrder": 1 })
    return response(image, false, 'Lấy data thành công', 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetAllImageByComic = async (req) => {
  try {
    const ComicID = req.params.ComicID
    const images = await Image.find({ Comic: ComicID }).sort({ Chapter: 1 })
    return response(images, false, "Lấy data thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}


const ImageService = {
  fncInsertImage,
  fncUpdateImage,
  fncGetAllImagesByChapter,
  fncGetAllImageByComic
}

export default ImageService
