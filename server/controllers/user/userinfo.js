// const { User, Taste, User_taste } = require('../../models');

// const {
//   isAuthorized,
//   checkRefeshToken,
//   generateAccessToken,
// } = require('../tokenFunctions');
module.exports = {
  get: (req, res) => {
    console.log('userinfo get');
  },
  patch: (req, res) => {},
  delete: (req, res) => {},
  taste: {
    user_id: {
      get: (req, res) => {
        console.log('taste user_id get');
      },
      patch: (req, res) => {
        console.log('taste user_id patch');
      },
    },
  },
  etiquette: {
    user_id: {
      get: (req, res) => {},
      post: (req, res) => {},
      patch: (req, res) => {},
    },
  },
};
