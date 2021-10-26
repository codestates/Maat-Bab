const { User, Taste, User_taste } = require('../../models');
const { generateAccessToken, generateRefreshToken, sendAccessToken, sendRefreshToken } = require('../tokenFunctions');

module.exports = {
  post: (req, res) => {
    const [reqEmail, reqPassword] = [req.body.email, req.body.password];

    if (!reqEmail || !reqPassword) {
      return res.status(400).send('Check password and name');
    }

    User.findOne({
      where: { email: reqEmail },
    })
      .then((data) => {
        if (!data) {
          return res.status(404).send('No exists');
        }

        const { password } = data;

        if (reqPassword !== password) {
          return res.status(422).send('Failed to login');
        }

        delete data.dataValues.password;

        const userinfo = data.dataValues;
        const accessToken = generateAccessToken(userinfo);
        const refreshToken = generateRefreshToken(userinfo);

        sendAccessToken(res, accessToken);
        sendRefreshToken(res, refreshToken);

        return res.status(200).send(userinfo);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send('Internal Server Error');
      });
  },
};
