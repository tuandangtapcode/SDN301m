import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Notificaitons = new Schema({
  Content: { type: String },
  Artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  Comic: { type: mongoose.Schema.Types.ObjectId, ref: 'Comics' },

})

const NotificaitonsModel = mongoose.model('Notificaitons', Notificaitons)

export default NotificaitonsModel

