import UserService from '../services/user.service.js'

const getListAuthour = async (req, res) => {
  const author = await UserService.fncGetListAuthor(req)
  return res.status(author.StatusCode).json(author)
}
const getDetailProfile = async (req, res) => {
  const detail = await UserService.fncGetDetailProfile(req)
  return res.status(detail.StatusCode).json(detail)
}

const UserController = {
  getListAuthour,
  getDetailProfile,
}

export default UserController;
