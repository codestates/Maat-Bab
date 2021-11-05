module.exports = {
  // User
  auth: require('./user/auth'),
  signup: require('./user/signup'),
  signin: require('./user/signin'),
  signout: require('./user/signout'),
  kakao: require('./oauth/kakao'),
  google: require('./oauth/google'),
  userinfo: require('./user/userinfo'),
  mail: require('./user/mail'),
  certification: require('./user/certification'),
  sameEmail: require('./user/sameEmail'),
  // Taste
  taste: require('./taste'),
  // Card
  card: require('./card'),
};
