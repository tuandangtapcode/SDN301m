import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Notificaitons = new Schema({
  Content: { type: String },
  Author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },

})

const NotificaitonsModel = mongoose.model('Notificaitons', Notificaitons)

export default NotificaitonsModel

