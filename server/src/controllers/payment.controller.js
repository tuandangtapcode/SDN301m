import PaymentService from "../services/payment.service.js"

const getAllPayments = async (req, res) => {
  try {
    const response = await PaymentService.fncGetAllPayments(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}


const PaymentController = {
  getAllPayments
}

export default PaymentController
