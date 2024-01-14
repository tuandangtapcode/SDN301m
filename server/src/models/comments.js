import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Comments = new Schema({
  content: { type: String },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  comic: { type: mongoose.Schema.Types.ObjectId, ref: 'Comics' },

})

const CommentsModel = mongoose.model('Comments', Comments);

export default CommentsModel;

