import Comic from '../models/comic.js'
import response from '../utils/response-result.js'
import cloudinary from 'cloudinary'

const cloudinaryV2 = cloudinary.v2

const fncGetAllComics = async (req) => {
  try {
    const { TextSearch, CurrentPage, PageSize } = req.body
    const comics = await Comic.find({
      Title: { $regex: TextSearch, $options: 'i' }
    })
      .populate('Author', ['FullName'])
      .skip(CurrentPage * PageSize)
      .limit(PageSize)
    return response(
      { List: comics, Total: comics.length },
      false,
      'Lấy data thành công',
      200
    )
  } catch (error) {
    return response({}, true, error.toString(), 200)
  }
}

const fncInsertComic = async (req) => {
  try {
    const { Title } = req.body
    const comic = Comic.findOne({ Title })
    if (comic) {
      cloudinaryV2.uploader.destroy(req.file.filename)
      return response({}, true, `Truyện: ${Title} đã tồn tại`, 200)
    }
    const create = await Comic.create({ ...req.body, AvatarPath: req.file.path, AvatarPathId: req.file.filename })
    return response(create, false, "Thêm mới thành công", 201)
  } catch (error) {
    return response({}, true, error.toString(), 200)
  }
}


const ComicService = {
  fncGetAllComics,
  fncInsertComic
}

export default ComicService
