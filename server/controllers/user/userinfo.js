const { User, Taste, User_taste } = require('../../models');

const {
  isAuthorized,
  checkRefeshToken,
  generateAccessToken,
} = require('../tokenFunctions');
module.exports = {
  get: (req, res) => {},
  patch: (req, res) => {},
  delete: (req, res) => {},
  taste: {
    get: (req, res) => {},
    user_id: {
      get: (req, res) => {},
      patch: (req, res) => {},
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
