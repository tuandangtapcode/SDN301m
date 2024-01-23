import http from '../index'
import { apiGetInforByGoogleLogin } from './urls'


const getInforByGoogleLogin = (access_token) => http.get(apiGetInforByGoogleLogin, {
  headers: {
    Authorization: `Bearer ${access_token}`
  }
})

const UserService = {
  getInforByGoogleLogin
}

export default UserService
