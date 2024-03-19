import { response } from "../utils/lib.js"
import User from "../models/user.js"
import Comic from "../models/comic.js"
import Package from '../models/package.js'
import { accessToken, refreshToken } from "../utils/jwt.js"
import bcrypt from "bcrypt"
const saltRounds = 10
import cloudinary from "cloudinary"
import sendEmail from "../utils/send-mail.js"

const cloudinaryV2 = cloudinary.v2

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
    const UserID = req.user.ID
    const detail = await User
      .findOne({ _id: UserID })
      .select('_id, FullName RoleID AvatarPath Description Follows IsByGoogle Premium')
      .populate('Follows', ['AvatarPath', 'Title', 'Likes', 'Reads'])
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
    if (!!getUser && !getUser.Password) return response({}, true, "Mật khẩu không chính xác", 200)
    const check = bcrypt.compareSync(Password, getUser.Password)
    if (!check) return response({}, true, "Mật khẩu không chính xác", 200)
    if (!getUser.IsActive)
      return response({}, true, "Tài khoản đã bị khóa", 200)
    const access_token = accessToken({
      ID: getUser._id,
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
      ID: getUser._id,
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
    const checkExist = await User.findOne({ Email })
    if (!!checkExist) return response({}, true, "Email đã tồn tại", 200)
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
    const checkExist = await User.findOne({ Email: email })
    if (!!checkExist) return response({}, true, "Email đã tồn tại", 200)
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
    const id = req.user.ID
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
    const UserID = req.user.ID
    const { OldPassword, NewPassword } = req.body
    const user = await User.findOne({ _id: UserID })
    if (!user) return response({}, true, "Không tồn tại user", 200)
    if (!user.IsActive) return response({}, true, "Tài khoản đã bị khóa", 200)
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
    const UserID = req.user.ID
    const { ComicID } = req.body
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

const fncBuyPremium = async (req) => {
  try {
    const UserID = req.user.ID
    const { EndedAt, PackageID } = req.body
    const updateAcc = await User.findByIdAndUpdate({ _id: UserID },
      {
        Premium: { BoughtAt: Date.now(), EndedAt, PackageID },
        RoleID: 4
      },
      { new: true }
    )
    if (!updateAcc) return response({}, true, "User không tồn tại", 200)
    const updatePackage = await Package.findByIdAndUpdate({ _id: PackageID }, {
      $inc: { Quantity: 1 }
    })
    if (!updatePackage) return response({}, true, "Gói không tồn tại", 200)
    return response({
      FullName: updateAcc.FullName,
      RoleID: updateAcc.RoleID,
      AvatarPath: updateAcc.AvatarPath,
      Description: updateAcc.Description,
      Follows: updateAcc.Follows,
      IsByGoogle: updateAcc.IsByGoogle,
      Premium: updateAcc.Premium,
      _id: updateAcc._id,
    },
      false,
      "Update thành công",
      200
    )
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncHandleExpiredPremium = async (req) => {
  try {
    const UserID = req.params.UserID
    const updateAcc = await User.findByIdAndUpdate({ _id: UserID }, { RoleID: 5 }, { new: true })
    if (!updateAcc) return response({}, true, "Người dùng không tồn tại", 200)
    return response({
      FullName: updateAcc.FullName,
      RoleID: updateAcc.RoleID,
      AvatarPath: updateAcc.AvatarPath,
      Description: updateAcc.Description,
      Follows: updateAcc.Follows,
      IsByGoogle: updateAcc.IsByGoogle,
      Premium: updateAcc.Premium
    },
      false,
      "Update thành công",
      200
    )
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncCheckEmail = async (req) => {
  try {
    const Email = req.body.Email
    const check = await User.findOne({ Email })
    if (!check) return response({}, true, "Email không tồn tại", 200)
    if (!check.IsActive)
      return response({}, true, "Tài khoản đã bị khóa", 200)
    const subject = "Thiết lập lại mật khẩu tài khoản khách hàng"
    const content = `
                <html>
                <head>
                <style>
                    p {
                        color: #333;
                    }
                </style>
                </head>
                <body>
                  <p>Xin chào ${check.FullName}</p>
                  <p>Anh/chị đã yêu cầu đổi mật khẩu tại Online comic.</p>
                  <p> Anh/chị vui lòng truy cập vào liên kết dưới đây để thay đổi mật khẩu của Anh/chị nhé..</p>
                  <a href='http://localhost:3000/reset-password'>Đặt lại mật khẩu</a>
                </body>
                </html>
                `
    await sendEmail(Email, subject, content)
    return response(check._id, false, "Email đã được gửi", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncForgotPassword = async (req) => {
  try {
    const { NewPassword, UserID } = req.body
    const hashPassword = bcrypt.hashSync(NewPassword, saltRounds)
    const updateUser = await User.findByIdAndUpdate({ _id: UserID }, { Password: hashPassword, IsByGoogle: false }, { new: true })
    if (!updateUser) return response({}, true, "Không tồn tại user", 200)
    return response(updateUser, false, "Mật khẩu đã được đổi thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}


const UserService = {
  fncGetListAuthor,
  fncGetDetailProfile,
  fncLogin,
  fncLoginByGoogle,
  fncRegister,
  fncRegisterByGoogle,
  fncGetListUser,
  fnDeactiveAccount,
  fncUpdateProfileCustomer,
  fncChangePassword,
  fncFollowOrUnfollowComic,
  fncBuyPremium,
  fncHandleExpiredPremium,
  fncCheckEmail,
  fncForgotPassword
}

export default UserService
