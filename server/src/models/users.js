import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Users = new Schema({
  fullname: { type: String },
  email: { type: String },
  roleID: { type: mongoose.Schema.Types.ObjectId, ref: 'Roles' },
  password: { type: String },
  avatar: { type: String },
  resfreshToken: { type: String },
})

const UsersModel = mongoose.model('Users', Users);

export default UsersModel;

