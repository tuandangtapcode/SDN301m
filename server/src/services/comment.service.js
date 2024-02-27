import Comment from '../models/comment.js'
import User from '../models/user.js'
import response from '../utils/response-result.js'

const fncInsertComment = async (req) => {
  try {
    const { Author } = req.body
    const user = await User.findOne({ _id: Author })
    if (!user) return response({}, true, "Có lỗi", 200)
    const newComment = await Comment.create(req.body)
    return response({ ...newComment, Author: { FullName: user.FullName, AvatarPath: user.AvatarPath } }, false, 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetAllCommentByComic = async (req) => {
  try {
    const ComicID = req.params.ComicID
    const comments = await Comment.find({ Comic: ComicID })
    return response({ List: comments, Total: comments.length }, false, "Lấy data thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}


const CommentService = {
  fncInsertComment,
  fncGetAllCommentByComic
}

export default CommentService
