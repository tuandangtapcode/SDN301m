import express from "express"
const router = express.Router()
import PaymentController from "../controllers/payment.controller.js"
import PaymentValidation from "../validations/payment.validation.js"

router.post("/getAllPayments",
  PaymentValidation.getAllPayments,
  PaymentController.getAllPayments
)

export default router
