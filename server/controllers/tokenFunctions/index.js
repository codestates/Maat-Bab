require('dotenv').config();

const { sign, verify } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: '300s' });
  },
  generateRefreshToken: (data) => {
    return sign(data, process.env.REFRESH_SECRET, { expiresIn: '7d' });
  },
  sendAccessToken: (res, accessToken) => {},
  sendRefreshToken: (res, refreshToken) => {},
  isAuthorized: (req) => {}, //=check access token, access token 검증 후 return 값 => 유효 : 유저 정보, 무효 : null?
  checkRefeshToken: (req) => {},
};
//쿠기만 관리
