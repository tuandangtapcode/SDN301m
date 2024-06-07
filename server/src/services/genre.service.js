import Genre from '../models/genre.js'
import { getOneDocument, handleListQuery, response } from '../utils/lib.js'

const fncGetAllGenres = async (req) => {
  try {
    const { TextSearch, CurrentPage, PageSize } = req.body
    let genres, total
    if (!!CurrentPage && !!PageSize && !!TextSearch) {
      genres = Genre
        .find({ Title: { $regex: TextSearch, $options: 'i' } })
        .skip((CurrentPage - 1) * PageSize)
        .limit(PageSize)
      total = Genre.countDocuments({ Title: { $regex: TextSearch, $options: 'i' } })
    } else {
      genres = Genre.find()
      total = Genre.countDocuments()
    }
    const result = handleListQuery([genres, total])
    return response(
      { List: result[0], Total: result[1] },
      false,
      "Lấy data thành công",
      200
    )
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncInsertGenre = async (req) => {
  try {
    const { Title } = req.body
    const genre = await getOneDocument(Genre, "Title", Title)
    if (genre) return response({}, true, `Thể loại truyện: ${Title} đã tồn tại`, 200)
    const create = await Genre.create(req.body)
    return response(create, false, "Thêm mới thành công", 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncUpdateGenre = async (req) => {
  try {
    const { id, Title } = req.body
    const checkExistGenre = await getOneDocument(Genre, "_id", id)
    if (!checkExistGenre) return response({}, true, `Thể loại truyện không tồn tại`, 200)
    const checkExistTitle = await getOneDocument(Genre, "Title", Title)
    if (!!checkExistTitle && !checkExistGenre._id.equals(checkExistTitle._id)) {
      return response({}, true, `Thể loại truyện: ${Title} đã tồn tại`, 200)
    }
    await Genre.updateOne({ _id: id }, req.body)
    return response({}, false, "Cập nhật thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncDeleteGenre = async (req) => {
  try {
    const id = req.params.id
    await Genre.findByIdAndDelete({ _id: id })
    return response({}, false, "Xóa thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}


const GenreService = {
  fncGetAllGenres,
  fncInsertGenre,
  fncUpdateGenre,
  fncDeleteGenre
}

export default GenreService
