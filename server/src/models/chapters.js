import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Chapters = new Schema({
  title: { type: String },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  avatar: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
})

const ChaptersModel = mongoose.model('Chapters', Chapters);

export default ChaptersModel;

