import UserService from "../services/user.service.js"

const getListAuthour = async (req, res) => {
  const author = await UserService.fncGetListAuthor(req)
  return res.status(author.StatusCode).json(author)
}
const getDetailProfile = async (req, res) => {
  const detail = await UserService.fncGetDetailProfile(req)
  return res.status(detail.StatusCode).json(detail)
}

// Get List Customer
const getListUser = async (req, res) => {
  const users = await UserService.fncGetListUser(req)
  return res.status(users.StatusCode).json(users)
}

// Deactive Account
const deactiveAccount = async (req, res) => {
  const deactive = await UserService.fnDeactiveAccount(req)
  return res.status(deactive.StatusCode).json(deactive)
}

const login = async (req, res) => {
  const respone = await UserService.fncLogin(req)
  return res.status(respone.StatusCode).json(respone)
}

const loginByGoogle = async (req, res) => {
  const respone = await UserService.fncLoginByGoole(req)
  return res.status(respone.StatusCode).json(respone)
}

const register = async (req, res) => {
  const respone = await UserService.fncRegister(req)
  return res.status(respone.StatusCode).json(respone)
}

const registerByGoogle = async (req, res) => {
  const respone = await UserService.fncRegisterByGoole(req)
  return res.status(respone.StatusCode).json(respone)
}

// View Profile Customer
const viewProfileCustomer = async (req, res) => {
  const profile = await UserService.fncGetDetailProfileCustomer(req);
  return res.status(profile.StatusCode).json(profile);
}

const UserController = {
  getListAuthour,
  getDetailProfile,
  login,
  loginByGoogle,
  register,
  registerByGoogle,
  getListUser,
  deactiveAccount,
  viewProfileCustomer,
};

export default UserController;
