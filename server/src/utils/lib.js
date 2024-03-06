export const randomNumber = () => {
  const min = 100000
  const max = 999999
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
  return randomNumber
}

export const response = (data, isError, msg, StatusCode) => {
  return { data, isError, msg, StatusCode }
}

export const Roles = {
  ROLE_ADMIN: 1,
  ROLE_AUTHOR: 3,
  ROLE_CUSTOMER_PREMIUM: 4,
  ROLE_CUSTOMER_NORMAL: 5,
}