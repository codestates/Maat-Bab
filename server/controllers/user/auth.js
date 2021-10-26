const { isAuth } = require('../../functions');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  get: (req, res) => {
    const userinfo = isAuth(req, res);
    if (userinfo) {
      return res.status(200).send(userinfo);
    }

    return res.status(401).send('failed to authenticate');
  },
};
