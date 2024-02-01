import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Images = new Schema({
  Image: { type: String, default: null },
  ImageId: { type: String, default: null },
  Comic: { type: mongoose.Schema.Types.ObjectId, ref: 'Comics' },
  Chapter: { type: Number },
  SortOrder: { type: Number }
})

const ImagesModel = mongoose.model('Images', Images)

export default ImagesModel

