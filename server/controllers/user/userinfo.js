const { User, Taste, User_taste } = require('../../models');
const {
  isAuthorized,
  checkRefeshToken,
  generateAccessToken,
  sendAccessToken,
  generateRefreshToken,
  sendRefreshToken,
} = require('../tokenFunctions');
const { isAuth } = require('../../functions');

module.exports = {
  get: (req, res) => {
    const userinfo = isAuth(req, res);
    if (userinfo) {
      return res.status(200).send(userinfo);
    }

    return res.status(400).send('Failed to get userinfo');
  },
  patch: async (req, res) => {
    if (isAuth(req, res)) {
      const { name, password } = req.body;
      const { user_id } = req.params;

      if (!name || !password) {
        return res.status(400).send('Check name and password');
      }

      await User.update(
        {
          name,
          password,
        },
        { where: { user_id } }
      )
        .then(async (data) => {
          await User.findOne({
            where: { user_id },
          }).then((data) => {
            delete data.dataValues.password;
            const userinfo = data.dataValues;
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            const accessToken = generateAccessToken(userinfo);
            const refreshToken = generateRefreshToken(userinfo);
            generateAccessToken(userinfo);
            generateRefreshToken(userinfo);
            sendAccessToken(res, accessToken);
            sendRefreshToken(res, refreshToken);
            return res.status(200).send(userinfo);
          });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send('Internal Server Error');
        });
    } else {
      return res.status(401).send('Invalid accessToken');
    }
  },
  delete: async (req, res) => {
    const userinfo = isAuth(req, res);
    if (userinfo) {
      const { user_id } = req.params;
      await User.destroy({
        where: { user_id },
      })
        .then((data) => {
          res.clearCookie('accessToken');
          res.clearCookie('refreshToken');
          return res.status(205).send(userinfo);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send('Internal Server Error');
        });
    } else {
      return res.status(401).send('Invalid accessToken');
    }
  },
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
      get: (req, res) => {
        const { user_id } = req.params;
        User.findOne({ where: { user_id } }).then((data) => {
          const etiquette = JSON.parse(data.etiquette);
          return res.status(200).send({ etiquette });
        });
      },
      patch: (req, res) => {
        const { user_id } = req.params;
        let etiquette;
        if (!req.body.etiquette) {
          etiquette = JSON.stringify([]);
        } else {
          etiquette = JSON.stringify(req.body.etiquette);
        }
        User.update({ etiquette }, { where: { user_id } })
          .then((data) => {
            etiquette = JSON.parse(etiquette);
            return res.status(200).send({ etiquette });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).send('Internal Server Error');
          });
      },
    },
  },
};
