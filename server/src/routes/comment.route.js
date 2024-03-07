import express from 'express'
const router = express.Router()
import CommentController from '../controllers/comment.controller.js'
import CommentValidation from '../validations/comment.validation.js'

router.post("/insertComment",
  CommentValidation.insertComment,
  CommentController.insertComment
)
router.get("/getAllCommentByComic/:ComicID",
  CommentValidation.getAllCommentByComic,
  CommentController.getAllCommentByComic
)

export default router