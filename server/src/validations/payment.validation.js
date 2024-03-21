import Joi from 'joi'

const getAllPayments = async (req, res, next) => {
  const trueCondition = Joi.object({
    CurrentPage: Joi.number().integer().min(1).required(),
    PageSize: Joi.number().integer().required(),
    Type: Joi.string().empty(""),
    TextSearch: Joi.string().empty(""),
    Date: Joi.date().empty("")
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}


const PaymentValidation = {
  getAllPayments
}

export default PaymentValidation
