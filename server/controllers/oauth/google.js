require('dotenv').config();
const { User } = require('../../models');
const { Op } = require('sequelize');
const { generateAccessToken, generateRefreshToken, sendAccessToken, sendRefreshToken } = require('../tokenFunctions');

module.exports = {
  post: async (req, res) => {
    const tokenId = req.body.data.tokenId;
    const google_accessToken = req.body.data.accessToken;
    const { googleId, email, name } = req.body.data.profileObj;

    await User.findOrCreate({
      where: { [Op.or]: [{ oauth: googleId }, { email: email }] },
      defaults: {
        email: email,
        password: null,
        name,
        etiquette: null,
        oauth: googleId,
        certification: true,
      },
    })
      .then(([result, created]) => {
        delete result.dataValues.password;

        const userinfo = result.dataValues;

        const accessToken = generateAccessToken(userinfo);
        const refreshToken = generateRefreshToken(userinfo);

        sendAccessToken(res, accessToken);
        sendRefreshToken(res, refreshToken);

        if (!created) {
          return res.status(200).send(userinfo);
        }
        return res.status(201).send(userinfo);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
