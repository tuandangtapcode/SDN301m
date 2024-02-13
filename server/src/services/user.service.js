import response from "../utils/response-result.js";
import User from "../models/user.js";
import { accessToken, refreshToken } from "../utils/jwt.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

const checkEmailExist = async (Email) => {
  let check = true;
  const user = await User.findOne({ Email });
  if (user) {
    check = false;
  }
  return check;
};

//Authors
const fncGetListAuthor = async (req) => {
  const { TextSearch, CurrentPage, PageSize } = req.body;
  try {
    // const regex = { $text: { $search: TextSearch } }
    // const query = { FullName: regex, IsPosted: true }
    const query = {
      IsPosted: false,
      FullName: { $regex: TextSearch, $options: "i" },
    };
    // if (!!TextSearch) {
    // query.FullName = { $regex: TextSearch, $options: 'i' }
    // }
    // console.log(query)
    const skip = (CurrentPage - 1) * PageSize;
    const limit = PageSize;
    const authors = await User.find(query).skip(skip).limit(limit);
    return response(
      { List: authors, Total: authors.length },
      false,
      "Lấy ra thành công",
      200
    );
  } catch (error) {
    return response({}, true, error.tostring(), 500);
  }
};

const fncGetListUser = async (req) => {
  try {
    const { TextSearch, CurrentPage, PageSize } = req.body;
    const regex = new RegExp(TextSearch, "i");
    const query = { FullName: regex, RoleID: { $in: [4, 5] } };
    const skip = (CurrentPage - 1) * PageSize;
    const limit = PageSize;
    const authors = await User.find(query).skip(skip).limit(limit);
    return response(authors, false, "Lấy ra thành công", 200);
  } catch (error) {
    return response({}, true, error.tostring(), 500);
  }
};

const fnDeactiveAccount = async (req) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    user.IsActive = false;
    await user.save();
    return response({}, false, "Khóa tài khoản thành công", 200);
  } catch (error) {
    return response({}, true, error.tostring(), 500);
  }
};

const fncGetDetailProfile = async (req) => {
  try {
    const UserID = req.params.id;
    const query = { _id: UserID };
    const detail = await User.findOne(query);
    return response(detail, false, "Lấy ra thành công", 200);
  } catch (error) {
    return response({}, true, error.toString(), 200);
  }
};

const fncLogin = async (req) => {
  try {
    const { Password, Email } = req.body;
    const getUser = await User.findOne({ Email });
    if (!getUser) return response({}, true, "Email không tồn tại", 200);
    const check = bcrypt.compareSync(Password, getUser.Password);
    if (!check) return response({}, true, "Mật khẩu không chính xác", 200);
    const access_token = accessToken({
      id: getUser._id,
      IsAdmin: getUser.IsAdmin,
    });
    return response(access_token, false, "Login thành công", 200);
  } catch (error) {
    return response({}, true, error.toString(), 500);
  }
};

const fncLoginByGoole = async (req) => {
  try {
    const email = req.body.email;
    const getUser = await User.findOne({ Email: email });
    if (!getUser) return response({}, true, "Email không tồn tại", 200);
    const access_token = accessToken({
      id: getUser._id,
      IsAdmin: getUser.IsAdmin,
    });
    return response(access_token, false, "Login thành công", 200);
  } catch (error) {
    return response({}, true, "Login thành công", 200);
  }
};

const fncRegister = async (req) => {
  try {
    const { Password, Email } = req.body;
    const checkExist = await checkEmailExist(Email);
    if (!checkExist) {
      return response({}, true, "Email đã tồn tại", 200);
    }
    const hashPassword = bcrypt.hashSync(Password, saltRounds);
    const refresh_token = refreshToken();
    const hashUser = {
      ...req.body,
      Password: hashPassword,
      ResfreshToken: refresh_token,
    };
    const newUser = await User.create(hashUser);
    return response(newUser, false, "Đăng ký tài khoản thành công", 201);
  } catch (error) {
    return response({}, true, error.toString(), 500);
  }
};

const fncRegisterByGoole = async (req) => {
  try {
    const { email, given_name, picture, RoleID } = req.body;
    const checkExist = await checkEmailExist(email);
    if (!checkExist) {
      return response({}, true, "Email đã tồn tại", 200);
    }
    const refresh_token = refreshToken();
    const newUser = await User.create({
      Email: email,
      FullName: given_name,
      Avatar: picture,
      ResfreshToken: refresh_token,
      RoleID: RoleID,
    });
    return response(newUser, false, "Đăng ký tài khoản thành công", 201);
  } catch (error) {
    return response({}, true, error.toString(), 500);
  }
};

// Update name của customer theo customer_id
const fncUpdateProfileCustomer = async (req) => {
  try {
    const { id, newName } = req.body;
    const query = { _id: id };
    const detail = await User.findOne(query);
    // Update the name
    detail.FullName = newName;
    await detail.save();
    return response(detail, false, "Cập nhật tên thành công", 200);
  } catch (error) {
    return response({}, true, error.toString(), 500);
  }
};

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
};

export default UserService;
