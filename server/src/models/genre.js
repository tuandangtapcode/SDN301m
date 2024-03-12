import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Genres = new Schema({
  Title: {
    type: String,
    require: true
  },
  ShortDescription: {
    type: String,
    require: true
  }
}, {
  timestamps: true
})

const GenresModel = mongoose.model('Genres', Genres)

export default GenresModel

