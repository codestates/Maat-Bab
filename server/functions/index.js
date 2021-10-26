const {
  isAuthorized,
  checkRefeshToken,
  generateAccessToken,
  sendAccessToken,
} = require('../controllers/tokenFunctions');

module.exports = {
  isAuth: (req, res) => {
    const userinfo = isAuthorized(req);
    if (!userinfo) {
      if (checkRefeshToken(req)) {
        return userinfo;
      }
      return null;
    }
    return userinfo;
  },
};
