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
      res.clearCookie('accessToken');
      userinfo = checkRefeshToken(req);
      console.log(userinfo);
      if (!userinfo) {
        res.clearCookie('refreshToken');
        return null;
      }
      delete userinfo.iat;
      delete userinfo.exp;
      const accesstoken = generateAccessToken(userinfo);
      sendAccessToken(res, accesstoken);
      return userinfo;
    }
    delete userinfo.iat;
    delete userinfo.exp;
    return userinfo;
  },
};
