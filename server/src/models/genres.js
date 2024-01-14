import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Genres = new Schema({
  title: { type: String },
  avatar: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
})

const GenresModel = mongoose.model('Genres', Genres);

export default GenresModel;

