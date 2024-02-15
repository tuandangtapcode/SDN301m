import Joi from 'joi'

const getListAuthorUser = async (req, res, next) => {
  const trueCondition = Joi.object({
    CurrentPage: Joi.number().integer().min(1).required(),
    PageSize: Joi.number().integer().required()
  })
  try {
    await trueCondition.validateAsync(req.body), { abortEarly: false }
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const registerByGoogle = async (req, res, next) => {
  const trueCondition = Joi.object({
    email: Joi.string().min(3).max(100).pattern(new RegExp('^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$')).required(),
    given_name: Joi.string().min(3).max(30).required(),
    picture: Joi.string().min(3).max(100).required(),
    RoleID: Joi.number().integer().valid(3, 5).required(),
  })
  try {
    await trueCondition.validateAsync(req.body), { abortEarly: false }
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const register = async (req, res, next) => {
  const trueCondition = Joi.object({
    Email: Joi.string().min(3).max(100).pattern(new RegExp('^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$')).required(),
    Password: Joi.string().min(3).max(30).pattern(new RegExp('^[A-Z][a-zA-Z0-9]{5,}$')).required(),
    RoleID: Joi.number().integer().valid(3, 5).required(),
  })
  try {
    await trueCondition.validateAsync(req.body), { abortEarly: false }
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const loginByGoogle = async (req, res, next) => {
  const trueCondition = Joi.object({
    email: Joi.string().min(3).max(100).pattern(new RegExp('^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$')).required(),
  })
  try {
    await trueCondition.validateAsync(req.body), { abortEarly: false }
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const login = async (req, res, next) => {
  const trueCondition = Joi.object({
    Email: Joi.string().min(3).max(100).pattern(new RegExp('^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$')).required(),
    Password: Joi.string().min(3).max(30).pattern(new RegExp('^[A-Z][a-zA-Z0-9]{5,}$')).required(),
  })
  try {
    await trueCondition.validateAsync(req.body), { abortEarly: false }
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const updateProfile = async (req, res, next) => {
  const trueCondition = Joi.object({
    UserID: Joi.any().required(),
    FullName: Joi.string().min(3).max(30),
    Description: Joi.string().min(3).max(100),
  })
  const trueConditionWithFile = Joi.object({
    fieldname: Joi.string().valid('Avatar'),
    originalname: Joi.string(),
    encoding: Joi.string(),
    mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif'),
    path: Joi.string(),
    size: Joi.number().max(5 * 1024 * 1024),
    filename: Joi.string()
  })
  try {
    await trueCondition.validateAsync(req.body), { abortEarly: false }
    await trueConditionWithFile.validateAsync(req.file), { abortEarly: false }
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const changePassword = async (req, res, next) => {
  const trueCondition = Joi.object({
    UserID: Joi.any().required(),
    OldPassword: Joi.string().min(3).max(30).pattern(new RegExp('^[A-Z][a-zA-Z0-9]{5,}$')).required(),
    NewPassword: Joi.string().min(3).max(30).pattern(new RegExp('^[A-Z][a-zA-Z0-9]{5,}$')).required(),
  })
  try {
    await trueCondition.validateAsync(req.body), { abortEarly: false }
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const getDetailProfile = async (req, res, next) => {
  const trueCondition = Joi.object({
    UserID: Joi.any().required(),
  })
  try {
    await trueCondition.validateAsync(req.body), { abortEarly: false }
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}


const UserValidation = {
  getListAuthorUser,
  registerByGoogle,
  register,
  loginByGoogle,
  login,
  updateProfile,
  changePassword,
  getDetailProfile
}

export default UserValidation
