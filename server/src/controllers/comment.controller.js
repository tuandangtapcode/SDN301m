import CommentService from '../services/comment.service.js'

const insertComment = async (req, res) => {
  try {
    const response = await CommentService.fncInsertComment(req)
    return res.status(response.StatusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getAllCommentByComic = async (req, res) => {
  try {
    const response = await CommentService.fncGetAllCommentByComic(req)
    return res.status(response.StatusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}


const CommentController = {
  insertComment,
  getAllCommentByComic
}

export default CommentController
