import Joi from 'joi'
import { getRegexEmail, getRegexPassword } from '../utils/lib.js'
import fileImageValidation from './file.validation.js'

const getListAuthorUser = async (req, res, next) => {
  const trueCondition = Joi.object({
    CurrentPage: Joi.number().integer().min(1).required(),
    PageSize: Joi.number().integer().required(),
    TextSearch: Joi.string().empty("")
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const registerByGoogle = async (req, res, next) => {
  const trueCondition = Joi.object({
    email: Joi.string().min(3).max(100).pattern(getRegexEmail()).required(),
    given_name: Joi.string().min(3).max(30).required(),
    picture: Joi.string().min(3).max(100).required(),
    RoleID: Joi.number().integer().valid(3, 5).required(),
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const register = async (req, res, next) => {
  const trueCondition = Joi.object({
    Email: Joi.string().min(3).max(100).pattern(getRegexEmail()).required(),
    Password: Joi.string().min(3).max(30).pattern(getRegexPassword()).required(),
    RoleID: Joi.number().integer().valid(3, 5).required(),
    FullName: Joi.string().min(3).max(30).required(),
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const loginByGoogle = async (req, res, next) => {
  const trueCondition = Joi.object({
    email: Joi.string().min(3).max(100).pattern(getRegexEmail()).required(),
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const login = async (req, res, next) => {
  const trueCondition = Joi.object({
    Email: Joi.string().min(3).max(100).pattern(getRegexEmail()).required(),
    Password: Joi.string().min(3).max(30).pattern(getRegexPassword()).required(),
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const updateProfile = async (req, res, next) => {
  const trueCondition = Joi.object({
    UserID: Joi.any().required(),
    FullName: Joi.string().min(3).max(30).required(),
    Description: Joi.string().min(3).max(100),
  })
  const trueConditionWithFile = fileImageValidation("Avatar")
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    await trueConditionWithFile.validateAsync(req.file, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const changePassword = async (req, res, next) => {
  const trueCondition = Joi.object({
    UserID: Joi.any().required(),
    OldPassword: Joi.string().min(3).max(30).pattern(getRegexPassword()).required(),
    NewPassword: Joi.string().min(3).max(30).pattern(getRegexPassword()).required(),
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const getParamsUserID = async (req, res, next) => {
  const trueCondition = Joi.object({
    UserID: Joi.any().required(),
  })
  try {
    await trueCondition.validateAsync(req.params, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const followOrUnfollowComic = async (req, res, next) => {
  const trueCondition = Joi.object({
    UserID: Joi.any().required(),
    ComicID: Joi.any().required()
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const buyPremium = async (req, res, next) => {
  const trueCondition = Joi.object({
    UserID: Joi.any().required(),
    EndedAt: Joi.date().required(),
    PackageID: Joi.any().required()
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
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
  getParamsUserID,
  followOrUnfollowComic,
  buyPremium
}

export default UserValidation
