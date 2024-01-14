import axios from 'axios'

const parseBody = (response) => {
  const resData = response.data
  return resData
}

const instance = axios.create()

instance.interceptors.response.use(
  response => parseBody(response),
)

export default instance;