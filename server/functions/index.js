const {
  isAuthorized,
  checkRefeshToken,
  generateAccessToken,
  sendAccessToken,
} = require('../controllers/tokenFunctions');

module.exports = {
  isAuth: (req, res) => {
    const userinfo = checkRefeshToken(req);
    if (!userinfo) {
      return false;
    } else {
      if (isAuthorized(req)) {
        return true;
      }
      const accessToken = generateAccessToken(userinfo);
      sendAccessToken(res, accessToken);
      return true;
    }
  },
};
