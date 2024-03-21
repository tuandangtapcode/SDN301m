import http from "../index"
import { apiGetAllPayments } from "./urls"

const getAllPayments = body => http.post(apiGetAllPayments, body)


const PaymentService = {
  getAllPayments
}

export default PaymentService
