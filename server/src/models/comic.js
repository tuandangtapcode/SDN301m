import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Comics = new Schema({
  Title: { type: String },
  Author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  ShortDecription: { type: String },
  AvatarPath: { type: String, default: null },
  AvatarPathId: { type: String, default: null },
  Genres: {
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Genres' }
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
    { type: Date, default: null }
  ],
  Status: { type: Boolean, default: false },
  PostedBy: { type: Number }
})

const ComicsModel = mongoose.model('Comics', Comics)

export default ComicsModel
