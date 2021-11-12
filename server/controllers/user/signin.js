const { User } = require('../../models');
const { generateAccessToken, generateRefreshToken, sendAccessToken, sendRefreshToken } = require('../tokenFunctions');
const { generateHashData } = require('../../functions');

module.exports = {
  post: (req, res) => {
    const [reqEmail, reqPassword] = [req.body.email, req.body.password];

    if (!reqEmail || !reqPassword) {
      return res.status(400).end();
    }

    User.findOne({
      where: { email: reqEmail },
    })
      .then((data) => {
        if (!data) {
          return res.status(404).end();
        }

        const { password, salt } = data;
        const hashPassword = generateHashData(salt + reqPassword);

        if (hashPassword !== password) {
          return res.status(403).end();
        }

        delete data.dataValues.password;
        delete data.dataValues.salt;
        data.dataValues.etiquette = JSON.parse(data.dataValues.etiquette);

        const userinfo = data.dataValues;
        const accessToken = generateAccessToken(userinfo);
        const refreshToken = generateRefreshToken(userinfo);

        sendAccessToken(res, accessToken);
        sendRefreshToken(res, refreshToken);

        return res.status(200).send(userinfo);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).end();
      });
  },
};
