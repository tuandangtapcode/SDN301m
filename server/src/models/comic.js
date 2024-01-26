import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Comics = new Schema({
  Title: { type: String },
  Artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  ShortDecription: { type: String },
  Genres: {
    type: [
      {
        GenresID: { type: mongoose.Schema.Types.ObjectId, ref: 'Genres' },
        Name: { type: String },
      }
    ],
    default: []
  },
  Chapters: {
    type: [
      {
        ChapterID: { type: Number },
        Name: { type: String },
      }
    ],
    default: []
  },
  CreatedAt: { type: Date, default: Date.now },
  Likes: { type: Number, default: 0 },
  Reads: { type: Number, default: 0 },
  ReadedAt: [
    { type: Date, default: Date.now }
  ],
  Status: { type: Boolean, default: false },
})

const ComicsModel = mongoose.model('Comics', Comics)

export default ComicsModel
