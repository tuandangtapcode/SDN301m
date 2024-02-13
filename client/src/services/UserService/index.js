import http from "../index";
import {
  apiGetInforByGoogleLogin,
  apiLogin,
  apiRegister,
  apiGetListAuthor,
  apiGetDetailProfile,
  apiLoginByGoogle,
  apiRegisterByGoogle,
  apiGetListCustomer,
  apiDeactiveAccount,
  apiUpdateUser,
} from "./urls";

const getInforByGoogleLogin = (access_token) =>
  http.get(apiGetInforByGoogleLogin, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
const getListAuthour = (body) => http.post(apiGetListAuthor, body);
const getDetailProfile = (UserID) =>
  http.get(`${apiGetDetailProfile}/${UserID}`);
const login = (body) => http.post(apiLogin, body);
const loginByGoogle = (body) => http.post(apiLoginByGoogle, body);
const register = (body) => http.post(apiRegister, body);
const registerByGoogle = (body) => http.post(apiRegisterByGoogle, body);
const getListCustomer = () => http.get(apiGetListCustomer);
const deActiveAccount = (UserId) => http.get(`${apiDeactiveAccount}/${UserId}`);
const updateProfile = (body) => http.put(apiUpdateUser, body);

const UserService = {
  getInforByGoogleLogin,
  getListAuthour,
  getDetailProfile,
  login,
  loginByGoogle,
  register,
  registerByGoogle,
  getListCustomer,
  deActiveAccount,
  updateProfile,
};

export default UserService;
