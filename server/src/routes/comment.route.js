import express from 'express'
const router = express.Router()
import CommentController from '../controllers/comment.controller.js'
import CommentValidation from '../validations/comment.validation.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { Roles } from '../utils/lib.js'

router.post("/insertComment",
  authMiddleware([Roles.ROLE_AUTHOR, Roles.ROLE_CUSTOMER_NORMAL, Roles.ROLE_CUSTOMER_PREMIUM]),
  CommentValidation.insertComment,
  CommentController.insertComment
)
router.get("/getAllCommentByComic/:ComicID",
  CommentValidation.getAllCommentByComic,
  CommentController.getAllCommentByComic
)

export default router