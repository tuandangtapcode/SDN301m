import UserService from "../services/user.service.js";

const getListAuthour = async (req, res) => {
  const author = await UserService.fncGetListAuthor(req);
  return res.status(author.StatusCode).json(author);
};
const getDetailProfile = async (req, res) => {
  const detail = await UserService.fncGetDetailProfile(req);
  return res.status(detail.StatusCode).json(detail);
};

// Get List Customer
const getListCustomer = async (req, res) => {
  const customer = await UserService.fncGetListCustomer(req);
  return res.status(customer.StatusCode).json(customer);
};

// Deactive Account
const deactiveAccount = async (req, res) => {
  const deactive = await UserService.fnDeactiveAccount(req);
  return res.status(deactive.StatusCode).json(deactive);
};

const login = async (req, res) => {
  const respone = await UserService.fncLogin(req);
  return res.status(respone.StatusCode).json(respone);
};

const register = async (req, res) => {
  const respone = await UserService.fncRegister(req);
  return res.status(respone.StatusCode).json(respone);
};

const UserController = {
  getListAuthour,
  getDetailProfile,
  login,
  register,
  getListCustomer,
  deactiveAccount,
};

export default UserController;
