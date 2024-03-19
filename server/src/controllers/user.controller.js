import UserService from "../services/user.service.js"

const getListAuthour = async (req, res) => {
  try {
    const author = await UserService.fncGetListAuthor(req)
    return res.status(author.statusCode).json(author)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getDetailProfile = async (req, res) => {
  try {
    const detail = await UserService.fncGetDetailProfile(req)
    return res.status(detail.statusCode).json(detail)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getListUser = async (req, res) => {
  try {
    const users = await UserService.fncGetListUser(req)
    return res.status(users.statusCode).json(users)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const deactiveAccount = async (req, res) => {
  try {
    const deactive = await UserService.fnDeactiveAccount(req)
    return res.status(deactive.statusCode).json(deactive)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const login = async (req, res) => {
  try {
    const respone = await UserService.fncLogin(req)
    return res.status(respone.statusCode).json(respone)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const loginByGoogle = async (req, res) => {
  try {
    const respone = await UserService.fncLoginByGoogle(req)
    return res.status(respone.statusCode).json(respone)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const register = async (req, res) => {
  try {
    const respone = await UserService.fncRegister(req)
    return res.status(respone.statusCode).json(respone)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const registerByGoogle = async (req, res) => {
  try {
    const respone = await UserService.fncRegisterByGoogle(req)
    return res.status(respone.statusCode).json(respone)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const updateProfileCustomer = async (req, res) => {
  try {
    const profile = await UserService.fncUpdateProfileCustomer(req)
    return res.status(profile.statusCode).json(profile)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const changePassword = async (req, res) => {
  try {
    const respone = await UserService.fncChangePassword(req)
    return res.status(respone.statusCode).json(respone)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const followOrUnfollowComic = async (req, res) => {
  try {
    const respone = await UserService.fncFollowOrUnfollowComic(req)
    return res.status(respone.statusCode).json(respone)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const buyPremium = async (req, res) => {
  try {
    const respone = await UserService.fncBuyPremium(req)
    return res.status(respone.statusCode).json(respone)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const handleExpiredPremium = async (req, res) => {
  try {
    const respone = await UserService.fncHandleExpiredPremium(req)
    return res.status(respone.statusCode).json(respone)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const checkEmail = async (req, res) => {
  try {
    const respone = await UserService.fncCheckEmail(req)
    return res.status(respone.statusCode).json(respone)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const forgotPassword = async (req, res) => {
  try {
    const respone = await UserService.fncForgotPassword(req)
    return res.status(respone.statusCode).json(respone)
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
  updateProfileCustomer,
  changePassword,
  followOrUnfollowComic,
  buyPremium,
  handleExpiredPremium,
  checkEmail,
  forgotPassword
}

export default UserController
