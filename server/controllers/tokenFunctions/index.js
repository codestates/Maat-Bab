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
  resendAccessToken: (res, accessToken) => {},
  isAuthorized: (req) => {},
  checkRefeshToken: (req) => {},
};
