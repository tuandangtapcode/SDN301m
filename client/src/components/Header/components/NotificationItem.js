import moment from "moment"

const NotificationItem = ({ data }) => {
  return (
    <div className={data?.IsSeen ? "text-gray" : "text-black"}>
      <p>
        {data?.Content}
      </p>
      <p>
        {moment(data.createdAt).calendar()}
      </p>
    </div>
  )
}

export default NotificationItem