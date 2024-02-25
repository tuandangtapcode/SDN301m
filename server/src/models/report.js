import mongoose from "mongoose";

const Schema = mongoose.Schema

const Report = new Schema({
  Content: {
    type: String,
    require: true
  },
  Customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    require: true
  },
  Commic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comics',
    require: true
  },
  Status: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

const ReportsModel = mongoose.Model("Reports", Report)

export default ReportsModel