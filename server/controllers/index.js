module.exports = {
  // User
  auth: require('./user/auth'),
  signup: require('./user/signup'),
  signin: require('./user/signin'),
  signout: require('./user/signout'),
  kakao: require('./oauth/kakao'),
  userinfo: require('./user/userinfo'),
  sameEmail: require('./sameEmail'),
  // Taste
  taste: require('./taste'),
  // Card
  card: require('./card'),
  // Chat
  chat: require('./chat'),
};
