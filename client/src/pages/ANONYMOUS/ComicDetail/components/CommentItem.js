const CommentItem = ({ comment }) => {
  return (
    <div className="d-flex">
      <img src={comment?.Author?.AvatarPath} alt="" />
      <div>
        <p>{comment?.Author?.FullName}</p>
        <p>{comment?.Content}</p>
      </div>
    </div>
  )
}

export default CommentItem