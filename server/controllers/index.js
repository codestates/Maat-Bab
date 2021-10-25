module.exports = {
  // User
  auth: require('./user/auth'),
  signup: require('./user/signup'),
  signin: require('./user/signin'),
  signout: require('./user/signout'),
  oauth: require('./user/oauth'),
  userinfo: require('./user/userinfo'),
  // Taste
  taste: require('./taste'),
  // Card
  card: require('./card'),
  // Chat
  chat: require('./chat'),
};