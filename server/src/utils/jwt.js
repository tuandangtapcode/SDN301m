import jwt from 'jsonwebtoken';

const accessToken = (payload) => {
  const access_token = jwt.sign({ payload }, process.env.ACCESS_TOKEN, { expiresIn: '365d' })
  return access_token;
}

export default accessToken;