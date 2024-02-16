import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Notificaitons = new Schema({
  Content: {
    type: String,
    require: true
  },
  Sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    require: true
  },
  Receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    require: true
  },
  IsSeen: {
    type: Boolean,
    default: false
  },
  CreatedAt: {
    type: Date,
    default: Date.now
  },
})

const NotificaitonsModel = mongoose.model('Notificaitons', Notificaitons)

export default NotificaitonsModel

