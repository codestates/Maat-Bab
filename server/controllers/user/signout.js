const { isAuthorized } = require('../tokenFunctions');
module.exports = {
  post: (req, res) => {
    const userinfo = isAuthorized(req);
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.status(205).send(userinfo);
  },
};
