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
        const accessToken = generateAccessToken(userinfo);
        sendAccessToken(res, accessToken);
        return true;
      }
      return false;
    }
    return true;
  },
};
