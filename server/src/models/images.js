import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Images = new Schema({
  avatar: { type: String, default: null },
  comic: { type: mongoose.Schema.Types.ObjectId, ref: 'Comics' },
  chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapters' },
})

const ImagesModel = mongoose.model('Images', Images);

export default ImagesModel;

