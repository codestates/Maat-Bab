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
      userinfo = checkRefeshToken(req);
      if (userinfo) {
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
