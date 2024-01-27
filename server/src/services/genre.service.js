import Genre from '../models/genre.js'
import response from '../utils/response-result.js'

const fncGetAllGenres = async () => {
  try {
    const genres = await Genre.find()
    return response(genres, false, "Lấy data thành công", 200)
  } catch (error) {
    return response({}, true, "Lấy data thành công", 200)
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
    return response({}, true, error.toString(), 200)
  }
}

const fncUpdateGenre = async (req) => {
  try {
    const id = req.params.id
    const { Title } = req.body
    const checkExistGenre = await Genre.find({ _id: id })
    if (!checkExistGenre) return response({}, true, "Thể loại truyện không tồn tại", 200)
    const checkExistTitle = await Genre.findOne({ Title })
    if (!!checkExistTitle && checkExistGenre._id !== checkExistTitle._id) {
      return response({}, true, `Thể loại truyện: ${Title} đã tồn tại`, 200)
    }
    await Genre.updateOne({ _id: id }, req.body)
    return response({}, false, "Cập nhật thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 200)
  }
}

const fncDeleteGenre = async (req) => {
  try {
    const id = req.params.id
    const checkExistGenre = await Genre.find({ _id: id })
    if (!checkExistGenre) return response({}, true, "Thể loại truyện không tồn tại", 200)
    await Genre.deleteOne({ _id: id })
    return response({}, false, "Xóa thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 200)
  }
}


const GenreService = {
  fncGetAllGenres,
  fncInsertGenre,
  fncUpdateGenre,
  fncDeleteGenre
}

export default GenreService
