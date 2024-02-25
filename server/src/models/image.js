import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Images = new Schema({
  Image: {
    type: String,
    require: true
  },
  ImageName: {
    type: String,
    require: true
  },
  ImageId: {
    type: String,
    require: true
  },
  Comic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comics',
    require: true
  },
  Chapter: {
    type: Number,
    require: true
  },
  SortOrder: {
    type: Number,
    require: true
  }
}, {
  timestamps: true
})

const ImagesModel = mongoose.model('Images', Images)

export default ImagesModel

