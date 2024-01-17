import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Users = new Schema({
  FullName: { type: String },
  Email: { type: String },
  IsAdmin: { type: Boolean, default: false },
  Password: { type: String },
  Avatar: { type: String },
  ResfreshToken: { type: String },
  IsActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
})

const UsersModel = mongoose.model('Users', Users);

export default UsersModel;

