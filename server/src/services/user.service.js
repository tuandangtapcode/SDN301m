import response from '../utils/response-result.js'
import User from '../models/user.js'
import { accessToken, refreshToken } from '../utils/jwt.js'
import bcrypt from 'bcrypt'
const saltRounds = 10

const checkEmailExist = async (Email) => {
  let check = true
  const user = await User.findOne({ Email })
  if (user) {
    check = false
  }
  return check
}

const fncGetListAuthor = async (req) => {
  try {
    const { TextSearch, CurrentPage, PageSize } = req.body
    const regex = new RegExp(TextSearch, 'i')
    const query = { fullname: regex }
    const skip = (CurrentPage - 1) * PageSize
    const limit = PageSize
    const authors = await User.find(query)
      .skip(skip)
      .limit(limit)
    return response(authors, false, "Lấy ra thành công", 200)
  } catch (error) {
    return response(authors, false, error.tostring(), 200)
  }
}

const fncLogin = async (req) => {
  const { Password, Email } = req.body
  try {
    const getUser = await User.findOne({ Email })
    if (!getUser) return response({}, true, 'Email không tồn tại', 200)
    const check = bcrypt.compareSync(Password, getUser.Password)
    if (!check) return response({}, true, 'Mật khẩu không chính xác', 200)
    const access_token = accessToken({
      id: getUser._id,
      IsAdmin: getUser.IsAdmin,
    })
    return response(access_token, false, 'Login thành công', 200)
  } catch (error) {
    return response({}, true, error.toString(), 200)
  }
}

const fncRegister = async (req) => {
  try {
    const { Password, Email } = req.body
    const checkExist = await checkEmailExist(Email)
    if (!checkExist) {
      return response({}, true, 'Email đã tồn tại', 201)
    }
    const hashPassword = bcrypt.hashSync(Password, saltRounds)
    const refresh_token = refreshToken()
    const hashUser = { ...req.body, Password: hashPassword, ResfreshToken: refresh_token }
    const newUser = await User.create(hashUser)
    return response(newUser, false, 'Đăng ký tài khoản thành công', 201)
  } catch (error) {
    return response({}, true, error.toString(), 200)
  }
}

const UserService = {
  fncGetListAuthor,
  fncLogin,
  fncRegister
}

export default UserService
