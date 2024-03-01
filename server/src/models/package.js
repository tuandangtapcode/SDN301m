import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Packages = new Schema({
  Title: {
    type: String,
    require: true
  },
  Description: {
    type: String,
    require: true
  },
  Price: {
    type: String,
    require: true
  },
  Duration: {
    type: Number,
    require: true
  },
  Quantity: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

const PackagesModel = mongoose.model('Packages', Packages)

export default PackagesModel

