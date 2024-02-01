import Genre from '../models/genre.js'
import response from '../utils/response-result.js'

const fncGetAllGenres = async () => {
  try {
    const genres = await Genre.find()
    return response(genres, false, "Lấy data thành công", 200)
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
    const id = req.params.id
    const { Title } = req.body
    const checkExistGenre = await Genre.find({ _id: id })
    const checkExistTitle = await Genre.findOne({ Title })
    if (!!checkExistTitle && checkExistGenre._id !== checkExistTitle._id) {
      return response({}, true, `Thể loại truyện: ${Title} đã tồn tại`, 200)
    }
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
    return response(genre, false, "Lấy data thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 200)
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
