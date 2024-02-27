import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Comments = new Schema({
  Content: {
    type: String,
    require: true
  },
  Author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    require: true
  },
  Comic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comics',
    require: true
  },
}, {
  timestamps: true
})

const CommentsModel = mongoose.model('Comments', Comments)

export default CommentsModel

