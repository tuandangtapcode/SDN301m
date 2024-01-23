import response from '../utils/response-result.js'
import User from '../models/user.js'

const fncGetListAuthor = async (req) => {
  try {
    const { TextSearch, CurrentPage, PageSize } = req.body;
    const regex = new RegExp(TextSearch, 'i');
    const query = { fullname: regex };
    const skip = (CurrentPage - 1) * PageSize;
    const limit = PageSize;
    const authors = await User.find(query)
      .skip(skip)
      .limit(limit);
    return response(authors, false, "Lấy ra thành công", 200)
  } catch (error) {
    return response(authors, false, error.tostring(), 200)
  }
}

const fncLoginByGoogle = async (req) => {
  try {

  } catch (error) {

  }
}

const UserService = {
  fncGetListAuthor,
  // fncAbc

}

export default UserService;
