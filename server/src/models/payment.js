import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Payments = new Schema({
  UserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    require: true
  },
  UserName: {
    type: String,
    require: true
  },
  PackageID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Packages',
    require: true
  },
  BoughtAt: {
    type: Date,
    required: true
  },
  EndedAt: {
    type: Date,
    required: true
  },
}, {
  timestamps: true
})

const PaymentsModel = mongoose.model('Payments', Payments)

export default PaymentsModel

