import response from "../utils/response-result.js"
import User from "../models/user.js"
import Comic from "../models/comic.js"
import { accessToken, refreshToken } from "../utils/jwt.js"
import bcrypt from "bcrypt"
const saltRounds = 10
import cloudinary from "cloudinary"

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
  try {
    const { TextSearch, CurrentPage, PageSize } = req.body
    const query = {
      RoleID: 3,
      FullName: { $regex: TextSearch, $options: "i" },
    }
    const skip = (CurrentPage - 1) * PageSize
    const limit = PageSize
    const authors = await User.find(query).skip(skip).limit(limit)
    return response(
      { List: authors, Total: authors.length },
      false,
      "Lấy ra thành công",
      200
    )
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetListUser = async (req) => {
  try {
    const { TextSearch, CurrentPage, PageSize } = req.body
    const users = await User.find({
      FullName: { $regex: TextSearch, $options: "i" },
      RoleID: { $ne: 1 },
    })
      .skip((CurrentPage - 1) * PageSize)
      .limit(PageSize)
    return response(
      { List: users, Total: users.length },
      false,
      "Lấy ra thành công",
      200
    )
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fnDeactiveAccount = async (req) => {
  try {
    const UserID = req.params.UserID
    const user = await User.findByIdAndUpdate(
      { _id: UserID },
      { IsActive: false }
    )
    if (!user) return response({}, true, "Không tồn tại user", 200)
    return response(user, false, "Khóa tài khoản thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetDetailProfile = async (req) => {
  try {
    const UserID = req.params.UserID
    const detail = await User
      .findOne({ _id: UserID })
      .select('_id, FullName RoleID AvatarPath Description Follows IsByGoogle')
      .populate('Follows', ['AvatarPath', 'Title', 'Likes', 'Reads'])
    if (!detail) return response({}, true, "Không tồn tại user", 200)
    return response(detail, false, "Lấy ra thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetDetailAuthour = async (req) => {
  try {
    const UserID = req.query.UserID
    const detail = await User.findOne({ _id: UserID }).select(
      "Description FullName AvatarPath"
    )
    if (!detail) return response({}, true, "Không tồn tại user", 200)
    return response(detail, false, "Lấy ra thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncLogin = async (req) => {
  try {
    const { Password, Email } = req.body
    const getUser = await User.findOne({ Email })
    if (!getUser) return response({}, true, "Email không tồn tại", 200)
    const check = bcrypt.compareSync(Password, getUser.Password)
    if (!check) return response({}, true, "Mật khẩu không chính xác", 200)
    if (!getUser.IsActive)
      return response({}, true, "Tài khoản đã bị khóa", 200)
    const access_token = accessToken({
      id: getUser._id,
      RoleID: getUser.RoleID,
    })
    return response(access_token, false, "Login thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncLoginByGoogle = async (req) => {
  try {
    const email = req.body.email
    const getUser = await User.findOne({ Email: email })
    if (!getUser) return response({}, true, "Email không tồn tại", 200)
    if (!getUser.IsActive)
      return response({}, true, "Tài khoản đã bị khóa", 200)
    const access_token = accessToken({
      id: getUser._id,
      RoleID: getUser.RoleID,
    })
    return response(access_token, false, "Login thành công", 200)
  } catch (error) {
    return response({}, true, "Login thành công", 200)
  }
}

const fncRegister = async (req) => {
  try {
    const { Password, Email } = req.body
    const checkExist = await checkEmailExist(Email)
    if (!checkExist) return response({}, true, "Email đã tồn tại", 200)
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

const fncRegisterByGoogle = async (req) => {
  try {
    const { email, given_name, picture, RoleID } = req.body
    const checkExist = await checkEmailExist(email)
    if (!checkExist) return response({}, true, "Email đã tồn tại", 200)
    const refresh_token = refreshToken()
    const newUser = await User.create({
      Email: email,
      FullName: given_name,
      AvatarPath: picture,
      ResfreshToken: refresh_token,
      RoleID: RoleID,
    })
    return response(newUser, false, "Đăng ký tài khoản thành công", 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncUpdateProfileCustomer = async (req) => {
  try {
    const id = req.body.UserID
    const user = await User.findOne({ _id: id })
    if (!user) return response({}, true, "Không tồn tại user", 200)
    const updateProfile = await User.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body,
        AvatarPath: !!req.file ? req.file.path : user?.AvatarPath,
        AvatarPathId: !!req.file ? req.file.filename : user?.AvatarPathId,
      },
      { new: true }
    )
    if (!!req.file && !!user.AvatarPathId) {
      cloudinaryV2.uploader.destroy(user.AvatarPathId)
    }
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
    if (!user) return response({}, true, "Không tồn tại user", 200)
    const check = bcrypt.compareSync(OldPassword, user.Password)
    if (!check) return response({}, true, "Mật khẩu không chính xác", 200)
    const hashPassword = bcrypt.hashSync(NewPassword, saltRounds)
    const userUpdate = await User.findByIdAndUpdate(
      { _id: UserID },
      { Password: hashPassword }
    )
    return response(
      userUpdate,
      false,
      "Mật khẩu được cập nhật thành công",
      200
    )
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncFollowOrUnfollowComic = async (req) => {
  try {
    const { ComicID, UserID } = req.body
    const user = await User.findOne({ _id: UserID })
    if (!user) return response({}, true, "Người dùng không tồn tại", 200)
    const followedComic = user.Follows.find(i => i.equals(ComicID))
    let followed
    if (!followedComic) {
      followed = await User.findByIdAndUpdate({ _id: UserID }, { $push: { Follows: ComicID } })
      await Comic.findByIdAndUpdate({ _id: ComicID }, {
        $inc: {
          Likes: 1
        }
      })
    } else {
      followed = await User.findByIdAndUpdate({ _id: UserID }, { $pull: { Follows: ComicID } })
      await Comic.findByIdAndUpdate({ _id: ComicID }, {
        $inc: {
          Likes: -1
        }
      })
    }
    return response(followed, false, !followedComic ? "Follow thành công" : "Hủy follow thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}


const UserService = {
  fncGetListAuthor,
  fncGetDetailProfile,
  fncGetDetailAuthour,
  fncLogin,
  fncLoginByGoogle,
  fncRegister,
  fncRegisterByGoogle,
  fncGetListUser,
  fnDeactiveAccount,
  fncUpdateProfileCustomer,
  fncChangePassword,
  fncFollowOrUnfollowComic
}

export default UserService
