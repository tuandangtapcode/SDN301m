import http from '../index'
import {
  apiGetInforByGoogleLogin,
  apiLogin,
  apiRegister,
  apiGetListAuthor,
} from './urls'


const getInforByGoogleLogin = (access_token) => http.get(apiGetInforByGoogleLogin, {
  headers: {
    Authorization: `Bearer ${access_token}`
  }
})
const getListAuthour = body => http.post(apiGetListAuthor, body)

const login = (body) => http.post(apiLogin, body)

const register = (body) => http.post(apiRegister, body)

const UserService = {
  getInforByGoogleLogin,
  getListAuthour,
  login,
  register
}

export default UserService
