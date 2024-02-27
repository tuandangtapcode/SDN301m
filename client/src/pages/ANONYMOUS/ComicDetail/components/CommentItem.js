import { CommentItemStyled } from "../styled"

const CommentItem = ({ comment }) => {
  return (
    <CommentItemStyled>
      <img style={{ width: '70px', height: '70px', borderRadius: '50%', marginRight: '12px' }} src={comment?.Author?.AvatarPath} alt="" />
      <div style={{ flex: 1, backgroundColor: '#f7f7f7' }} >
        <p className="title-type-4">{comment?.Author?.FullName}</p>
        <p className="mt-12">{comment?.Content}</p>
      </div>
    </CommentItemStyled >
  )
}

export default CommentItem