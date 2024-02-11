import response from "../utils/response-result.js"
import User from "../models/user.js"
import { accessToken, refreshToken } from "../utils/jwt.js"
import bcrypt from 'bcrypt'
const saltRounds = 10
import cloudinary from 'cloudinary'

const cloudinaryV2 = cloudinary.v2

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
  const { TextSearch, CurrentPage, PageSize } = req.body
  try {
    // const regex = { $text: { $search: TextSearch } }
    // const query = { FullName: regex, IsPosted: true }
    const query = { IsPosted: false, FullName: { $regex: TextSearch, $options: 'i' } }
    // if (!!TextSearch) {
    // query.FullName = { $regex: TextSearch, $options: 'i' }
    // }
    // console.log(query)
    const skip = (CurrentPage - 1) * PageSize
    const limit = PageSize
    const authors = await User.find(query)
      .skip(skip)
      .limit(limit)
    return response(
      { List: authors, Total: authors.length },
      false,
      "Lấy ra thành công",
      200
    )
  } catch (error) {
    return response({}, true, error.tostring(), 500)
  }
}

const fncGetListUser = async (req) => {
  try {
    const { TextSearch, CurrentPage, PageSize } = req.body
    const regex = new RegExp(TextSearch, "i")
    const query = { FullName: regex, RoleID: { $ne: 1 } }
    const users = await User.find(query).skip((CurrentPage - 1) * PageSize).limit(PageSize)
    return response(
      { List: users, Total: users.length },
      false,
      "Lấy ra thành công",
      200
    )
  } catch (error) {
    return response({}, true, error.tostring(), 500)
  }
}

const fnDeactiveAccount = async (req) => {
  try {
    const UserID = req.params.id
    const user = await User.findByIdAndUpdate({ _id: UserID }, { IsActive: false })
    return response(user, false, "Khóa tài khoản thành công", 200)
  } catch (error) {
    return response({}, true, error.tostring(), 500)
  }
}

const fncGetDetailProfile = async (req) => {
  try {
    const UserID = req.body.UserID
    const detail = await User.findOne({ _id: UserID })
    return response(detail, false, "Lấy ra thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 200)
  }
}

const fncLogin = async (req) => {
  try {
    const { Password, Email } = req.body
    const getUser = await User.findOne({ Email })
    if (!getUser) return response({}, true, "Email không tồn tại", 200)
    const check = bcrypt.compareSync(Password, getUser.Password)
    if (!check) return response({}, true, "Mật khẩu không chính xác", 200)
    const access_token = accessToken({
      id: getUser._id,
      RoleID: getUser.RoleID,
    })
    return response(access_token, false, "Login thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncLoginByGoole = async (req) => {
  try {
    const email = req.body.email
    const getUser = await User.findOne({ Email: email })
    if (!getUser) return response({}, true, 'Email không tồn tại', 200)
    const access_token = accessToken({
      id: getUser._id,
      IsAdmin: getUser.IsAdmin,
    })
    return response(access_token, false, 'Login thành công', 200)
  } catch (error) {
    return response({}, true, 'Login thành công', 200)
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
    return response({}, true, error.toString(), 500)
  }
}

const fncRegisterByGoole = async (req) => {
  try {
    const { email, given_name, picture, RoleID } = req.body
    const checkExist = await checkEmailExist(email)
    if (!checkExist) {
      return response({}, true, 'Email đã tồn tại', 200)
    }
    const refresh_token = refreshToken()
    const newUser = await User.create({
      Email: email,
      FullName: given_name,
      AvatarPath: picture,
      ResfreshToken: refresh_token,
      RoleID: RoleID
    })
    return response(newUser, false, 'Đăng ký tài khoản thành công', 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncUpdateProfileCustomer = async (req) => {
  try {
    const id = req.body.UserID
    const user = await User.findOne({ _id: id })
    const updateProfile = await User.findByIdAndUpdate({ _id: id }, {
      ...req.body,
      AvatarPath: !!req.file ? req.file.path : user?.AvatarPath,
      AvatarPathId: !!req.file ? req.file.filename : user?.AvatarPathId,
    })
    return response(updateProfile, false, "Cập nhật tên thành công", 200)
  } catch (error) {
    if (!!req.file) cloudinaryV2.uploader.destroy(req.file.filename)
    return response({}, true, error.toString(), 500)
  }
}

const fncChangePassword = async (req) => {
  try {
    const { OldPassword, NewPassword, UserID } = req.body
    const user = await User.findOne({ _id: UserID })
    const check = bcrypt.compareSync(OldPassword, user.Password)
    if (!check) return response({}, true, 'Mật khẩu không chính xác', 200)
    const hashPassword = bcrypt.hashSync(NewPassword, saltRounds)
    const userUpdate = await User.findByIdAndUpdate({ _id: UserID }, { Password: hashPassword })
    return response(userUpdate, false, "Mật khẩu được cập nhật thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
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
  fncUpdateProfileCustomer,
  fncChangePassword
}

export default UserService
