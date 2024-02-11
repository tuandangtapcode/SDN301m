import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Users = new Schema({
  FullName: { type: String },
  Email: { type: String },
  Description: { type: String, default: null },
  Password: { type: String, default: null },
  AvatarPath: { type: String, default: "https://res.cloudinary.com/dusauuqbh/image/upload/v1706771998/SDN201m/Avatar/vfk0i4ljzqxkw29d5iip.jpg" },
  AvatarPathId: { type: String, default: null },
  ResfreshToken: { type: String, default: null },
  IsActive: { type: Boolean, default: true },
  CreatedAt: { type: Date, default: Date.now },
  Follows: {
    type: [
      { ComicID: { type: mongoose.Schema.Types.ObjectId, ref: 'Comics' } }
    ],
    default: []
  },
  RoleID: { type: Number },
})

const UsersModel = mongoose.model('Users', Users)

export default UsersModel

