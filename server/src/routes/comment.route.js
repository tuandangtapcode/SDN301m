import express from 'express'
const router = express.Router()
import CommentController from '../controllers/comment.controller.js'

router.post("/insertComment",
  CommentController.insertComment
)
router.get("/getAllCommentByComic/:ComicID",
  CommentController.getAllCommentByComic
)

export default router