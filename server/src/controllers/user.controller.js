import UserService from '../services/user.service.js'

const getListAuthour = async (req, res) => {
  const author = await UserService.fncGetListAuthor(req)
  return res.status(author.StatusCode).json(author)
}

const UserController = {
  getListAuthour
}

export default UserController;
