import response from "../utils/response-result.js"
import User from "../models/user.js"
import { accessToken, refreshToken } from "../utils/jwt.js"

const checkEmailExist = async (Email) => {
  let check = true
  const user = await User.findOne({ Email })
  if (user) {
    check = false
  }
  return check
}

//Authors
const fncGetListAuthor = async (req) => {
  try {
    const { TextSearch, CurrentPage, PageSize } = req.body
    const regex = new RegExp(TextSearch, "i")
    const query = { fullname: regex }
    const skip = (CurrentPage - 1) * PageSize
    const limit = PageSize
    const authors = await User.find(query).skip(skip).limit(limit)
    return response(authors, false, "Lấy ra thành công", 200)
  } catch (error) {
    return response(authors, false, error.tostring(), 200)
  }
}

const fncGetListUser = async (req) => {
  try {
    const { TextSearch, CurrentPage, PageSize } = req.body
    const regex = new RegExp(TextSearch, "i")
    // Updated query to include isAdmin condition
    const query = { FullName: regex, IsAdmin: false }
    const skip = (CurrentPage - 1) * PageSize
    const limit = PageSize
    const authors = await User.find(query).skip(skip).limit(limit)
    console.log(authors)
    return response(authors, false, "Lấy ra thành công", 200)
  } catch (error) {
    return response(authors, false, error.tostring(), 200)
  }
}

const fnDeactiveAccount = async (req) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
      return response(null, false, "Không tìm thấy tài khoản", 200)
    }
    user.IsActive = false
    await user.save()
    return response(null, false, "Khóa tài khoản thành công", 200)
  } catch (error) {
    return response(null, false, error.tostring(), 200)
  }
}

const fncGetDetailProfile = async (req) => {
  try {
    const UserID = req.params.id
    const query = { _id: UserID }
    const detail = await User.findOne(query)
    return response(detail, false, "Lấy ra thành công", 200)
  } catch (error) {
    return response({}, false, error.toString(), 200)
  }
}

const fncLogin = async (req) => {
  const { Password, Email } = req.body
  try {
    const getUser = await User.findOne({ Email })
    if (!getUser) return response({}, true, "Email không tồn tại", 200)
    const check = bcrypt.compareSync(Password, getUser.Password)
    if (!check) return response({}, true, "Mật khẩu không chính xác", 200)
    const access_token = accessToken({
      id: getUser._id,
      IsAdmin: getUser.IsAdmin,
    })
    return response(access_token, false, "Login thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 200)
  }
}

const fncLoginByGoole = async (req) => {
  const email = req.body.email
  try {
    const getUser = await User.findOne({ Email: email })
    if (!getUser) return response({}, true, 'Email không tồn tại', 200)
    const access_token = accessToken({
      id: getUser._id,
      IsAdmin: getUser.IsAdmin,
    })
    return response(access_token, false, 'Login thành công', 200)
  } catch (error) {

  }
}

const fncRegister = async (req) => {
  try {
    const { Password, Email } = req.body
    const checkExist = await checkEmailExist(Email)
    if (!checkExist) {
      return response({}, true, 'Email đã tồn tại', 200)
    }
    const hashPassword = bcrypt.hashSync(Password, saltRounds)
    const refresh_token = refreshToken()
    const hashUser = {
      ...req.body,
      Password: hashPassword,
      ResfreshToken: refresh_token,
    }
    const newUser = await User.create(hashUser)
    return response(newUser, false, "Đăng ký tài khoản thành công", 201)
  } catch (error) {
    return response({}, true, error.toString(), 200)
  }
}

const fncRegisterByGoole = async (req) => {
  const { email, given_name, picture } = req.body
  try {
    const checkExist = await checkEmailExist(email)
    if (!checkExist) {
      return response({}, true, 'Email đã tồn tại', 200)
    }
    const newUser = await User.create({
      Email: email,
      FullName: given_name,
      Avatar: picture
    })
    return response(newUser, false, 'Đăng ký tài khoản thành công', 201)
  } catch (error) {

  }
}


const UserService = {
  fncGetListAuthor,
  fncGetDetailProfile,
  fncLogin,
  fncLoginByGoole,
  fncRegister,
  fncRegisterByGoole,
  fncGetListUser,
  fnDeactiveAccount,
}

export default UserService
