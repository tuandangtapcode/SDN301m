import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Comics = new Schema({
  Title: {
    type: String,
    require: true
  },
  Author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    require: true
  },
  ShortDescription: {
    type: String,
    require: true
  },
  AvatarPath: {
    type: String,
    require: true
  },
  AvatarPathId: {
    type: String,
    require: true
  },
  Genres: {
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Genres' }
    ],
    require: true
  },
  Chapters: {
    type: [
      {
        ChapterID: { type: Number },
        Name: { type: String },
        Reads: { type: Number, default: 0 }
      },
    ],
    require: true,
  },
  Likes: {
    type: Number,
    default: 0
  },
  Reads: {
    type: Number,
    default: 0
  },
  ReadedAt: [
    { type: Date, default: null }
  ],
  Status: {
    type: Number,
    default: 0
  },
  PostedBy: {
    type: Number
  },
  UpdatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

const ComicsModel = mongoose.model('Comics', Comics)

export default ComicsModel
