import jwt from 'jsonwebtoken';
import response from '../utils/response-result'

const checkExistToken = (req) => {
  let check = false
  if (!!req.headers.token) {
    check = true
  }
  return check
}

export const authAdminMidleware = (req, res, next) => {
  const checkToken = checkExistToken(req)
  if (!checkToken) {
    return res.status(401).json(
      response({}, true, 'Không có token')
    )
  }
  const token = req.headers.token.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decode) {
    if (err) {
      return res.status(401).json(
        response({}, true, 'Không có token')
      )
    }
    const { payload } = decode;
    if (payload.is_admin) {
      next()
    } else {
      return res.status(403).json(
        response({}, true, 'Bạn không có quyền')
      )
    }
  })
}

export const authUsernMidleware = (req, res, next) => {
  const checkToken = checkExistToken(req)
  if (!checkToken) {
    return res.status(401).json(
      response({}, true, 'Không có token')
    )
  }
  const token = req.headers.token.split(' ')[1];
  const userid = req.body.Artist || req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decode) {
    if (err) {
      return res.status(401).json(
        response({}, true, 'Không có token')
      )
    }
    const { payload } = decode;
    if (!payload.is_admin && payload.id === userid) {
      next()
    } else {
      return res.status(403).json(
        response({}, true, 'Bạn không có quyền')
      )
    }
  })
}
