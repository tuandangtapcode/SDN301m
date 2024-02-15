import Genre from '../models/genre.js'
import response from '../utils/response-result.js'

const fncGetAllGenres = async (req) => {
  try {
    const { TextSearch, CurrentPage, PageSize } = req.body
    let genres
    if (!!CurrentPage && !!PageSize && !!TextSearch) {
      genres = await Genre
        .find({ Title: { $regex: TextSearch, $options: 'i' } })
        .skip((CurrentPage - 1) * PageSize)
        .limit(PageSize)
    } else {
      genres = await Genre.find()
    }
    return response(
      { List: genres, Total: genres.length },
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
    const genre = await Genre.findOne({ Title })
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
    const checkExistGenre = await Genre.find({ _id: id })
    if (!checkExistGenre) return response({}, true, `Thể loại truyện không tồn tại`, 200)
    const checkExistTitle = await Genre.findOne({ Title })
    if (!!checkExistTitle) return response({}, true, `Thể loại truyện: ${Title} đã tồn tại`, 200)
    await Genre.updateOne({ _id: id }, req.body)
    return response({}, false, "Cập nhật thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetDetailGenre = async (req) => {
  try {
    const id = req.params.id
    const genre = await Genre.find({ _id: id })
    if (!genre) return response({}, true, "Genre không tồn tại", 200)
    return response(genre, false, "Lấy data thành công", 200)
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
  fncGetDetailGenre,
  fncInsertGenre,
  fncUpdateGenre,
  fncDeleteGenre
}

export default GenreService
