const { User, Taste, User_taste } = require('../../models');

const {
  isAuthorized,
  checkRefeshToken,
  generateAccessToken,
} = require('../tokenFunctions');
module.exports = {
  get: (req, res) => {
    console.log('userinfo get');
  },
  patch: (req, res) => {},
  delete: (req, res) => {},
  taste: {
    user_id: {
      get: (req, res) => {
        const { user_id } = req.params;
        User_taste.findAll({
          where: { user_id },
          include: { model: Taste },
        })
          .then((data) => {
            if (!data.length) return res.status(404).send('No contents');
            const tastes = data.map((user_taste) => {
              return user_taste.Taste;
            });
            return res.status(200).send(tastes);
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).send('Internal Server Error');
          });
      },
      patch: async (req, res) => {
        const { user_id } = req.params;
        await User_taste.destroy({ where: { user_id } }).catch((err) => {
          console.log(err);
          return res.status(500).send('Internal Server Error');
        });

        if (!req.body.taste_id) return res.status(200).send([]);
        const tastes = req.body.taste_id;
        for (const taste_id of tastes) {
          await User_taste.create({ user_id, taste_id });
        }

        await User_taste.findAll({
          where: { user_id },
          include: { model: Taste },
        })
          .then((data) => {
            const tastes = data.map((user_taste) => {
              return user_taste.Taste;
            });
            return res.status(200).send(tastes);
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).send('Internal Server Error');
          });
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
