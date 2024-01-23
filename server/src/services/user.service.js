import response from '../utils/response-result.js'
import User from '../models/user.js'

//Authors
const fncGetListAuthor = async (req) => {
  try {
    const { TextSearch, CurrentPage, PageSize } = req.body;
    const regex = { $text: { $search: TextSearch } }
    const query = { FullName: regex, IsPosted: true };
    const skip = (CurrentPage - 1) * PageSize;
    const limit = PageSize;
    const authors = await User.find(query)
      .skip(skip)
      .limit(limit);
    return response({ List: authors, Total: authors.length }, false, "Lấy ra thành công", 200)
  } catch (error) {
    return response({}, false, error.toString(), 200)
  }
}
const fncGetDetailProfile = async (req) => {
  try {
    const UserID = req.params.UserID;
    const query = { _id: UserID }
    const detail = await User.findOne(query)
    return response(detail, false, "Lấy ra thành công", 200)
  } catch (error) {

  }
}

const fncLoginByGoogle = async (req) => {
  try {

  } catch (error) {

  }
}

const UserService = {
  fncGetListAuthor,
  fncGetDetailProfile,
  fncLoginByGoogle,
  // fncAbc

}

export default UserService;
