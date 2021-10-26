const {
  isAuthorized,
  checkRefeshToken,
  generateAccessToken,
  sendAccessToken,
} = require('../controllers/tokenFunctions');

module.exports = {
  isAuth: (req, res) => {
    let userinfo = isAuthorized(req);
    if (!userinfo) {
      if (checkRefeshToken(req)) {
        userinfo = checkRefeshToken(req);
        res.clearCookie('accessToken');
        const accesstoken = generateAccessToken(userinfo);
        sendAccessToken(res, accesstoken);
        return userinfo;
      }
      return null;
    }
    return userinfo;
  },
};
