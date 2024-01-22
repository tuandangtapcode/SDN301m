import jwt from 'jsonwebtoken';
import response from '../utils/response-result'

export const authAdminMidleware = (req, res, next) => {
  const token = req.headers.token.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decode) {
    if (err) {
      return res.status(403);
    }
    const { payload } = decode;
    if (payload.is_admin) {
      next();
    } else {
      return res.status(403)
    }
  })
}

export const authUsernMidleware = (req, res, next) => {
  const token = req.headers.token.split(' ')[1];
  const userid = req.body.artist || req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decode) {
    if (err) {
      return res.status(403);
    }
    const { payload } = decode;
    if (!payload.is_admin && payload.id === userid) {
      next();
    } else {
      return res.status(403).json(response({}, true, 'Bạn không có quyền'));
    }
  })
}
