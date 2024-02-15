import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Notificaitons = new Schema({
  Content: {
    type: String,
    require: true
  },
  Author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    require: true
  },

})

const NotificaitonsModel = mongoose.model('Notificaitons', Notificaitons)

export default NotificaitonsModel

