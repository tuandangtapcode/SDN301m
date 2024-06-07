import Payment from "../models/payment.js"
import { handleListQuery, response } from "../utils/lib.js"

const fncGetAllPayments = async (req) => {
  try {
    const { Type, TextSearch, CurrentPage, PageSize, Date } = req.body
    let query
    if (!Type) {
      query = {}
    } else if (Type === "User") {
      query = {
        UserName: { $regex: TextSearch, $options: "i" }
      }
    } else if (Type === "BoughtAt") {
      query = {
        BoughtAt: { $gte: Date }
      }
    } else if (Type === "EndedAt") {
      query = {
        BoughtAt: { $lte: Date }
      }
    }
    const payments = Payment
      .find(query)
      .populate('PackageID')
      .skip((CurrentPage - 1) * PageSize)
      .limit(PageSize)
    const total = Payment.countDocuments(query)
    const result = await handleListQuery(payments, total)
    return response({ List: result[0], Total: result[1] }, false, "Lấy data thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}


const PaymentService = {
  fncGetAllPayments
}

export default PaymentService
