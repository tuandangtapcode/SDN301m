import Comic from '../models/comic.js'
import response from '../utils/response-result.js'
import cloudinary from 'cloudinary'

const cloudinaryV2 = cloudinary.v2

const fncGetAllComics = async (req) => {
  try {
    const { TextSearch, CurrentPage, PageSize } = req.body
    const comics = await Comic.find({ Title: { $regex: TextSearch, $options: 'i' } })
      .skip((CurrentPage - 1) * PageSize)
      .limit(PageSize)
      .populate('Author', ['_id', 'FullName'])
      .populate('Genres', ['Title'])
    return response(
      { List: comics, Total: comics.length },
      false,
      'Lấy data thành công',
      200
    )
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncInsertComic = async (req) => {
  try {
    const { Title } = req.body
    const comic = await Comic.findOne({ Title })
    if (comic) {
      cloudinaryV2.uploader.destroy(req.file.filename)
      return response({}, true, `Truyện: ${Title} đã tồn tại`, 200)
    }
    const create = await Comic.create({ ...req.body, AvatarPath: req.file.path, AvatarPathId: req.file.filename })
    return response(create._id, false, "Thêm mới thành công", 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncUpdateComic = async (req) => {
  try {
    const { id, Title } = req.body
    const checkExist = await Comic.findOne({ _id: id })
    if (!checkExist) return response({}, true, 'Truyện không tồn tại', 200)
    const checkExistTitle = await Comic.findOne({ Title })
    if (!!checkExistTitle && checkExist._id !== checkExistTitle._id) {
      cloudinaryV2.uploader.destroy(req.file.filename)
      return response({}, true, `Truyện: ${Title} đã tồn tại`, 200)
    }
    const updateComic = await Comic.updateOne({ _id: id }, {
      ...req.body,
      AvatarPath: !!req.file ? req.file.path : checkExistTitle?.AvatarPath,
      AvatarPathId: !!req.file ? req.file.filename : checkExistTitle?.AvatarPathId,
    })
    return response(updateComic, false, "Cập nhật thành công thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}


const ComicService = {
  fncGetAllComics,
  fncInsertComic,
  fncUpdateComic
}

export default ComicService
