import UserService from '../services/user.service.js'


const getListAuthour = async (req, res) => {
  const author = await UserService.fncGetListAuthor(req)
  return res.status(author.StatusCode).json(author)
}
const getDetailProfile = async (req, res) => {
  const detail = await UserService.fncGetDetailProfile(req)
  return res.status(detail.StatusCode).json(detail)
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


const UserController = {
  getListAuthour,
  getDetailProfile,
  login,
  loginByGoogle,
  register,
  registerByGoogle
}

export default UserController
