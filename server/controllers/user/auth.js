const { isAuth } = require('../../functions');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  get: (req, res) => {
    if (isAuth(req, res)) {
      const userinfo = isAuthorized(req);
      return res.status(200).send(userinfo);
    }

    return res.status(400).send('failed to authenticate');
  },
};
