import http from '../index'
import {
  apiGetInforByGoogleLogin,
  apiLogin,
  apiRegister,
  apiGetListAuthor,
  apiGetDetailProfile,
  apiLoginByGoogle,
  apiRegisterByGoogle,
  apiUpdateProfile,
  apiChangePassword,
  apiGetListUser,
  apiDeactiveAccount,
} from './urls'


const getInforByGoogleLogin = (access_token) => http.get(apiGetInforByGoogleLogin, {
  headers: {
    Authorization: `Bearer ${access_token}`
  }
})
const getListAuthour = body => http.post(apiGetListAuthor, body)
const getDetailProfile = (ID, token) => http.get(`${apiGetDetailProfile}/${ID}`, {
  headers: {
    'token': `Bearer ${token}`
  }
})
const login = body => http.post(apiLogin, body)
const loginByGoogle = body => http.post(apiLoginByGoogle, body)
const register = body => http.post(apiRegister, body)
const registerByGoogle = body => http.post(apiRegisterByGoogle, body)
const updateProfile = body => http.post(apiUpdateProfile, body, {
  headers: {
    'Content-Type': 'multipart/form-data',
    'token': `Bearer ${localStorage.getItem('token')}`
  }
})
const changePassword = body => http.post(apiChangePassword, body, {
  headers: {
    'token': `Bearer ${localStorage.getItem('token')}`
  }
})
const getListUser = () => http.get(apiGetListUser, {
  headers: {
    'token': `Bearer ${localStorage.getItem('token')}`
  }
})
const deactiveAccount = (id) => http.get(`${apiDeactiveAccount}/${id}`, {
  headers: {
    'token': `Bearer ${localStorage.getItem('token')}`
  }
})


const UserService = {
  getInforByGoogleLogin,
  getListAuthour,
  getDetailProfile,
  login,
  loginByGoogle,
  register,
  registerByGoogle,
  updateProfile,
  changePassword,
  getListUser,
  deactiveAccount
}

export default UserService
