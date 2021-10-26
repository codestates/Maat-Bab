const { isAuth } = require('../../functions');
module.exports = {
  post: (req, res) => {
    const userinfo = isAuth(req, res);
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.status(205).send(userinfo);
  },
};
