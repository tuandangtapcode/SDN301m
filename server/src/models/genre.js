import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Genres = new Schema({
  Title: { type: String },
  ShortDecription: { type: String },
  CreatedAt: { type: Date, default: Date.now },
})

const GenresModel = mongoose.model('Genres', Genres)

export default GenresModel

