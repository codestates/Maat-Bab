require('dotenv').config();
const qs = require('qs');
const axios = require('axios');
const { User } = require('../../models');
const clientID = process.env.KAKAO_clientID;
const clientSecret = process.env.KAKAO_clientSecret;
const redirectUri = process.env.KAKAO_redirectUri;
const { generateAccessToken, generateRefreshToken, sendAccessToken, sendRefreshToken } = require('../tokenFunctions');

module.exports = {
  post: async (req, res) => {
    const code = req.body.code;
    let token, kakaoUser;
    try {
      token = await axios({
        method: 'POST',
        url: 'https://kauth.kakao.com/oauth/token',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify({
          //객체를 string 으로 변환
          grant_type: 'authorization_code', //특정 스트링
          client_id: clientID,
          // client_secret: clientSecret,
          redirectUri: redirectUri,
          code: code,
        }),
      }).then((tokenData) => tokenData.data);
    } catch (err) {
      console.log(err);
      // res.status(err.response.status).end();
    }
    if (token) {
      try {
        kakaoUser = await axios({
          method: 'get',
          url: 'https://kapi.kakao.com/v2/user/me',
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        }).then((kakaoUserData) => kakaoUserData.data);
      } catch (err) {
        console.log(err);
        // res.status(err.response.status).end();
      }
    }

    if (kakaoUser) {
      const kakaoId = kakaoUser.id;
      const name = kakaoUser.kakao_account.profile.nickname;
      try {
        await User.findOrCreate({
          where: { oauth: kakaoId },
          defaults: {
            email: null,
            password: null,
            name,
            etiquette: null,
            oauth: kakaoId,
            certification: true,
          },
        }).then(([result, created]) => {
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
        });
      } catch (err) {
        console.log(err);
        // res.status(err.response.status).end();
      }
    }
  },
};
