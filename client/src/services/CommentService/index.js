import http from "../index"
import {
  apiGetAllCommentByComic,
  apiInsertComment,
} from "./urls"

const insertComment = body => http.post(apiInsertComment, body, {
  headers: {
    'token': `Bearer ${localStorage.getItem('token')}`
  }
})
const getAllCommentByComic = ComicID => http.get(`${apiGetAllCommentByComic}/${ComicID}`)


const CommentService = {
  insertComment,
  getAllCommentByComic
}

export default CommentService
