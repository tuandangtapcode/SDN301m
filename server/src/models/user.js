import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Users = new Schema({
  FullName: { type: String },
  Email: { type: String },
  IsAdmin: { type: Boolean, default: false },
  Password: { type: String, default: null },
  Avatar: { type: String, default: null },
  ResfreshToken: { type: String, default: null },
  IsActive: { type: Boolean, default: true },
  CreatedAt: { type: Date, default: Date.now },
  IsPosted: { type: Boolean, default: false },
})

const UsersModel = mongoose.model('Users', Users)

export default UsersModel

