const {
  isAuthorized,
  checkRefeshToken,
  generateAccessToken,
  generateRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} = require('../controllers/tokenFunctions');
const crypto = require('crypto');

module.exports = {
  isAuth: (req, res) => {
    let userinfo = isAuthorized(req);
    if (!userinfo) {
      res.clearCookie('accessToken', { domain: 'maat-bab.com', path: '/' });
      userinfo = checkRefeshToken(req);
      if (!userinfo) {
        res.clearCookie('refreshToken', { domain: 'maat-bab.com', path: '/' });
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
  generateDateMessage: (card_id) => {
    const today = new Date(Date.now());
    const todayMessage = today.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const date = Number(
      '' + today.getFullYear() + (today.getMonth() + 1) + today.getDate()
    );
    const message = {
      card_id,
      user_id: 0,
      type: 'date',
      message: todayMessage,
      date,
      time: `${today.getHours()}:${today.getMinutes()}`,
    };
    return message;
  },
  generateJoinMessage: (card_id, name) => {
    const today = new Date(Date.now());
    const date = Number(
      '' + today.getFullYear() + (today.getMonth() + 1) + today.getDate()
    );
    const message = {
      card_id,
      user_id: 0,
      type: 'message',
      message: `${name}님이 방에 참여하셨습니다`,
      date,
      time: `${today.getHours()}:${today.getMinutes()}`,
    };
    return message;
  },
  generateLeaveMessage: (card_id, name) => {
    const today = new Date(Date.now());
    const date = Number(
      '' + today.getFullYear() + (today.getMonth() + 1) + today.getDate()
    );
    const message = {
      card_id,
      user_id: 0,
      type: 'message',
      message: `${name}님이 방을 나가셨습니다`,
      date,
      time: `${today.getHours()}:${today.getMinutes()}`,
    };
    return message;
  },
  generateSalt: () => {
    return crypto.randomBytes(100).toString('base64');
  },
  generateHashData: (data) => {
    return crypto.createHash('sha512').update(data).digest('hex');
  },
  patchToken: (res, userinfo) => {
    res.clearCookie('accessToken', { domain: 'maat-bab.com', path: '/' });
    res.clearCookie('refreshToken', { domain: 'maat-bab.com', path: '/' });
    const accessToken = generateAccessToken(userinfo);
    const refreshToken = generateRefreshToken(userinfo);
    sendAccessToken(res, accessToken);
    sendRefreshToken(res, refreshToken);
  },
  getOrSetCache: (req, key, cb) => {
    const redisClient = req.app.get('client');
    return new Promise((resolve, reject) => {
      redisClient.get(key, async (err, data) => {
        if (err) return reject(err);
        if (data !== null) {
          return resolve(JSON.parse(data));
        }
        const freshData = await cb();
        redisClient.setex(key, 3600, JSON.stringify(freshData));
        return resolve(freshData);
      });
    });
  },
};
