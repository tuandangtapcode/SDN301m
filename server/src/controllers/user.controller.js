import UserService from "../services/user.service.js"

const getListAuthour = async (req, res) => {
  try {
    const author = await UserService.fncGetListAuthor(req)
    return res.status(author.StatusCode).json(author)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getDetailProfile = async (req, res) => {
  try {
    const detail = await UserService.fncGetDetailProfile(req)
    return res.status(detail.StatusCode).json(detail)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

// Get List Customer
const getListUser = async (req, res) => {
  try {
    const users = await UserService.fncGetListUser(req)
    return res.status(users.StatusCode).json(users)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

// Deactive Account
const deactiveAccount = async (req, res) => {
  try {
    const deactive = await UserService.fnDeactiveAccount(req)
    return res.status(deactive.StatusCode).json(deactive)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const login = async (req, res) => {
  try {
    const respone = await UserService.fncLogin(req)
    return res.status(respone.StatusCode).json(respone)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const loginByGoogle = async (req, res) => {
  try {
    const respone = await UserService.fncLoginByGoole(req)
    return res.status(respone.StatusCode).json(respone)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const register = async (req, res) => {
  try {
    const respone = await UserService.fncRegister(req)
    return res.status(respone.StatusCode).json(respone)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const registerByGoogle = async (req, res) => {
  try {
    const respone = await UserService.fncRegisterByGoole(req)
    return res.status(respone.StatusCode).json(respone)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

// Update Profile Profile Customer
const updateProfileCustomer = async (req, res) => {
  try {
    const profile = await UserService.fncUpdateProfileCustomer(req)
    return res.status(profile.StatusCode).json(profile)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
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
  updateProfileCustomer
}

export default UserController
