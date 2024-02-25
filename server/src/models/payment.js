import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Payments = new Schema({
  Title: {
    type: String,
    require: true
  },
  Customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    require: true
  },
  Content: {
    type: String,
    require: true
  }
}, {
  timestamps: true
})

const PaymentsModel = mongoose.model('Payments', Payments)

export default PaymentsModel
