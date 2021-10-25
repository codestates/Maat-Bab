const { isAuthorized, checkRefeshToken, generateAccessToken, sendAccessToken } = require('../tokenFunctions');

module.exports = {
  isAuth: (req, res) => {
    const userinfo = checkRefeshToken(req);
    if (userinfo) {
      if (isAuthorized(req)) {
        return true;
      }
      const accessToken = generateAccessToken(userinfo);
      sendAccessToken(res, accessToken);
      return true;
    } else {
      return false;
    }
  },
};
