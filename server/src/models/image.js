import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Images = new Schema({
  Avatar: { type: String, default: null },
  Comic: { type: mongoose.Schema.Types.ObjectId, ref: 'Comics' },
  Chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapters' },
})

const ImagesModel = mongoose.model('Images', Images);

export default ImagesModel;

