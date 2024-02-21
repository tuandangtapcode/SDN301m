import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Users = new Schema({
  FullName: {
    type: String,
    require: true
  },
  Email: {
    type: String,
    require: true
  },
  Description: {
    type: String,
    default: null
  },
  Password: {
    type: String,
    default: null
  },
  AvatarPath: {
    type: String,
    default: "https://res.cloudinary.com/dusauuqbh/image/upload/v1706771998/SDN201m/Avatar/vfk0i4ljzqxkw29d5iip.jpg"
  },
  AvatarPathId: {
    type: String,
    default: null
  },
  ResfreshToken: {
    type: String,
    require: true
  },
  IsActive: {
    type: Boolean,
    default: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now
  },
  Follows: {
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Comics' }
    ],
    default: []
  },
  RoleID: {
    type: Number,
    require: true
  },
})

const UsersModel = mongoose.model('Users', Users)

export default UsersModel

