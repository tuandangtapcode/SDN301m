import http from '../index'
import {
  apiGetInforByGoogleLogin,
  apiLogin,
  apiRegister
} from './urls'


const getInforByGoogleLogin = (access_token) => http.get(apiGetInforByGoogleLogin, {
  headers: {
    Authorization: `Bearer ${access_token}`
  }
})

const login = (body) => http.post(apiLogin, body)

const register = (body) => http.post(apiRegister, body)

const UserService = {
  getInforByGoogleLogin,
  login,
  register
}

export default UserService
