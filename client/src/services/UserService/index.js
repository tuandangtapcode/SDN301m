import http from '../index'
import { apiGetInforByGoogleLogin, apiGetListAuthor } from './urls'


const getInforByGoogleLogin = (access_token) => http.get(apiGetInforByGoogleLogin, {
  headers: {
    Authorization: `Bearer ${access_token}`
  }
})
const getListAuthour = body => http.post(apiGetListAuthor, body)

const UserService = {
  getInforByGoogleLogin,
  getListAuthour,
}

export default UserService
