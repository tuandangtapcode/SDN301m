import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Genres = new Schema({
  Title: {
    type: String,
    require: true
  },
  ShortDecription: {
    type: String,
    require: true
  },
  CreatedAt: {
    type: Date,
    default: Date.now
  },
})

const GenresModel = mongoose.model('Genres', Genres)

export default GenresModel

