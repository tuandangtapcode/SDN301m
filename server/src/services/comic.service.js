import Comic from '../models/comic.js'
import response from '../utils/response-result.js'
import cloudinary from 'cloudinary'

const cloudinaryV2 = cloudinary.v2

const fncGetAllComics = async (req) => {
  try {
    const { TextSearch, CurrentPage, PageSize } = req.body
    const comics = await Comic
      .find({ Title: { $regex: TextSearch, $options: 'i' } })
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

const fncGetAllComicsByGenres = async (req) => {
  try {
    const { TextSearch, CurrentPage, PageSize, GenreID } = req.body
    const comics = await Comic
      .find({
        Title: { $regex: TextSearch, $options: 'i' },
        Genres: { $elemMatch: GenreID }
      })
      .skip((CurrentPage - 1) * PageSize)
      .limit(PageSize)
      .populate('Author', ['_id', 'FullName'])
      .populate('Genres', ['Title'])
    if (!comics.length) {
      return response({ List: [], Total: 0 }, false, `Không tìm thấy comic có genre "${GenreID}"`)
    }
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

const fncGetAllComicsByAuthor = async (req) => {
  try {
    const { TextSearch, CurrentPage, PageSize, UserID, IsPrivated } = req.body
    let data, query
    if (!IsPrivated) {
      query = {
        Title: { $regex: TextSearch, $options: 'i' },
        Author: UserID,
        Status: true
      }
    } else {
      query = {
        Title: { $regex: TextSearch, $options: 'i' },
        Author: UserID,
      }
    }
    const comics = await Comic
      .find(query)
      .skip((CurrentPage - 1) * PageSize)
      .limit(PageSize)
    if (!IsPrivated) data = { List: comics, Total: comics.length, Author: user }
    else data = { List: comics, Total: comics.length }
    return response(data, false, "Lấy data thành công", 200)
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
    const { ComicID, UserID, Title } = req.body
    const checkExist = await Comic.findOne({ _id: ComicID, Author: UserID })
    if (!checkExist) return response(checkExist, true, 'Truyện không tồn tại', 200)
    const checkExistTitle = await Comic.findOne({ Title })
    if (!!checkExistTitle && checkExist._id !== checkExistTitle._id) {
      cloudinaryV2.uploader.destroy(req.file.filename)
      return response({}, true, `Truyện: ${Title} đã tồn tại`, 200)
    }
    const updateComic = await Comic.updateOne({ _id: ComicID }, {
      ...req.body,
      AvatarPath: !!req.file ? req.file.path : checkExistTitle?.AvatarPath,
      AvatarPathId: !!req.file ? req.file.filename : checkExistTitle?.AvatarPathId,
    })
    return response(updateComic, false, "Cập nhật thành công thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncDeleteComic = async (req) => {
  try {
    const { ComicID, UserID } = req.body
    const deleteComic = await Comic.deleteOne({ _id: ComicID, Author: UserID })
    if (!deleteComic.deletedCount) return response({}, true, "Có lỗi khi xóa", 200)
    return response(deleteComic, false, "Xóa thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetDetailComic = async (req) => {
  try {
    const id = req.params.ComicID
    const comic = await Comic.findOne({ _id: id })
      .populate('Author', ['_id', 'FullName'])
      .populate('Genres', ['Title'])
    if (!comic) return response({}, true, 'Truyện không tồn tại', 200)
    return response(comic, false, 'Lấy data thành công', 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncChangeStatusComic = async (req) => {
  try {
    const { ComicID, Status } = req.body
    const updateComic = await Comic.findByIdAndUpdate({ _id: ComicID }, { Status: Status })
    if (!updateComic) return response({}, true, 'Truyện không tồn tại', 200)
    return response({}, false, 'Cập nhật thành công', 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}


const ComicService = {
  fncGetAllComics,
  fncInsertComic,
  fncUpdateComic,
  fncDeleteComic,
  fncUpdateComic,
  fncGetAllComicsByGenres,
  fncGetDetailComic,
  fncGetAllComicsByAuthor,
  fncChangeStatusComic
}

export default ComicService
