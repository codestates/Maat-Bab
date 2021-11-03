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
  generateDateMessage: (card_id, date) => {
    const dateArr = date.split('.');
    const message = {
      card_id,
      user_id: 0,
      type: 'date',
      message: `${dateArr[0]}년${dateArr[1].slice(0, 3)}월${dateArr[2].slice(
        0,
        3
      )}일`,
      date: new Date(Date.now()).toLocaleDateString(),
      time: `${new Date(Date.now()).getHours()}:${new Date(
        Date.now()
      ).getMinutes()}`,
    };
    return message;
  },
  generateJoinMessage: (card_id, name) => {
    const message = {
      card_id,
      user_id: 0,
      type: 'message',
      message: `${name}님이 방에 참여하셨습니다`,
      date: new Date(Date.now()).toLocaleDateString(),
      time: `${new Date(Date.now()).getHours()}:${new Date(
        Date.now()
      ).getMinutes()}`,
    };
    return message;
  },
  generateLeaveMessage: (card_id, name) => {
    const message = {
      card_id,
      user_id: 0,
      type: 'message',
      message: `${name}님이 방을 나가셨습니다`,
      date: new Date(Date.now()).toLocaleDateString(),
      time: `${new Date(Date.now()).getHours()}:${new Date(
        Date.now()
      ).getMinutes()}`,
    };
    return message;
  },
};
