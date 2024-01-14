import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Comics = new Schema({
  title: { type: String },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  shortDecription: { type: String },
  genres: {
    type: [
      {
        GenresID: { type: mongoose.Schema.Types.ObjectId, ref: 'Genres' },
        name: { type: String },
      }
    ],
    default: []
  },
  chapterID: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapters' },
  avatar: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  reads: { type: Number, default: 0 },
  status: { type: Boolean, default: false }
})

const ComicsModel = mongoose.model('Comics', Comics);

export default ComicsModel;
