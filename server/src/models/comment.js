import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Comments = new Schema({
  Content: { type: String },
  Artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  Comic: { type: mongoose.Schema.Types.ObjectId, ref: 'Comics' },

})

const CommentsModel = mongoose.model('Comments', Comments);

export default CommentsModel;

