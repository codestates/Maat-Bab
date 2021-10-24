require('dotenv').config();

const { sign, verify } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: '300s' });
  },
  generateRefreshToken: (data) => {
    return sign(data, process.env.REFRESH_SECRET, { expiresIn: '7d' });
  },
  sendAccessToken: (res, accessToken) => {
    res.cookie('accessToken', accessToken, { httpOnly: true });
  },
  sendRefreshToken: (res, refreshToken) => {
    res.cookie('refreshToken', refreshToken, { httpOnly: true });
  },
  isAuthorized: (req) => {
    const accessToken = req.cookies.accessToken;

    if (accessToken) {
      try {
        return verify(accessToken, process.env.ACCESS_SECRET);
      } catch (err) {
        return null;
      }
    } else {
      return null;
    }
  },
  checkRefeshToken: (req) => {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      try {
        return verify(refreshToken, process.env.REFRESH_SECRET);
      } catch {
        return null;
      }
    } else return null;
  },
};
