import UserService from '../services/user.service.js'

const getListAuthour = async (req, res) => {
  const author = await UserService.fncGetListAuthor(req)
  return res.status(author.StatusCode).json(author)
}

const login = async (req, res) => {
  const respone = await UserService.fncLogin(req)
  return res.status(respone.StatusCode).json(respone)
}

const register = async (req, res) => {
  const respone = await UserService.fncRegister(req)
  return res.status(respone.StatusCode).json(respone)
}

const UserController = {
  getListAuthour,
  login,
  register
}

export default UserController
