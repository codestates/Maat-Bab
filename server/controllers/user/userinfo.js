const { User, Taste, User_taste } = require('../../models');
const {
  generateAccessToken,
  sendAccessToken,
  generateRefreshToken,
  sendRefreshToken,
} = require('../tokenFunctions');
const {
  isAuth,
  generateSalt,
  generateHashData,
  patchToken,
  getOrSetCache,
} = require('../../functions');

module.exports = {
  get: (req, res) => {
    const userinfo = isAuth(req, res);
    if (userinfo) {
      return res.status(200).send(userinfo);
    }

    return res.status(400).send('Failed to get userinfo');
  },
  patch: async (req, res) => {
    const userinfo = isAuth(req, res);

    if (userinfo) {
      const user_id = userinfo.user_id;
      const { name, password } = req.body;

      if (!name || !password) {
        return res.status(400).send('Check name and password');
      }

      const salt = generateSalt();
      const hashPassword = generateHashData(salt + password);

      await User.update(
        {
          name,
          password: hashPassword,
          salt,
        },
        { where: { user_id } }
      )
        .then(async (data) => {
          await User.findOne({
            where: { user_id },
          }).then((data) => {
            delete data.dataValues.password;
            delete data.dataValues.salt;
            data.dataValues.etiquette = JSON.parse(data.dataValues.etiquette);
            const newUserinfo = data.dataValues;
            res.clearCookie('accessToken', {
              domain: 'maat-bab.com',
              path: '/',
            });
            res.clearCookie('refreshToken', {
              domain: 'maat-bab.com',
              path: '/',
            });
            const accessToken = generateAccessToken(newUserinfo);
            const refreshToken = generateRefreshToken(newUserinfo);
            generateAccessToken(newUserinfo);
            generateRefreshToken(newUserinfo);
            sendAccessToken(res, accessToken);
            sendRefreshToken(res, refreshToken);
            return res.status(200).send(newUserinfo);
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
    const user_id = userinfo.user_id;
    if (userinfo) {
      await User.destroy({
        where: { user_id },
      })
        .then((data) => {
          res.clearCookie('accessToken', { domain: 'maat-bab.com', path: '/' });
          res.clearCookie('refreshToken', {
            domain: 'maat-bab.com',
            path: '/',
          });
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
    get: async (req, res) => {
      const userinfo = isAuth(req, res);
      if (!userinfo) {
        return res.status(401).send();
      }

      const { user_id } = userinfo;
      const data = await getOrSetCache(
        req,
        `userinfo/taste/${user_id}`,
        async () => {
          let tastes = await User_taste.findAll({
            where: { user_id },
            include: { model: Taste },
          }).catch((err) => {
            console.log(err);
            return res.status(500).send();
          });

          tastes = tastes.map((user_taste) => {
            return user_taste.Taste.dataValues;
          });

          return tastes;
        }
      );

      return res.status(200).send(data);
    },
    patch: async (req, res) => {
      const userinfo = isAuth(req, res);
      if (!userinfo) {
        return res.status(401).send();
      }

      const { user_id } = userinfo;

      await User_taste.destroy({ where: { user_id } }).catch((err) => {
        console.log(err);
        return res.status(500).send();
      });

      const taste_ids = req.body.taste_id;
      if (!taste_ids.length) return res.status(200).send([]);

      for (const taste_id of taste_ids) {
        await User_taste.create({ user_id, taste_id });
      }

      let tastes = await User_taste.findAll({
        where: { user_id },
        include: { model: Taste },
      });
      tastes = tastes.map((user_taste) => {
        return user_taste.Taste;
      });
      req.app
        .get('client')
        .setex(`userinfo/taste/${user_id}`, 3600, JSON.stringify(tastes));
      return res.status(200).send(tastes);
    },
  },
  etiquette: {
    get: (req, res) => {
      const userinfo = isAuth(req, res);
      if (!userinfo) {
        return res.status(401).send();
      }

      const { etiquette } = userinfo;
      return res.status(200).send({ etiquette });
    },
    patch: (req, res) => {
      const userinfo = isAuth(req, res);
      if (!userinfo) {
        return res.status(401).send();
      }

      const { user_id } = userinfo;
      const etiquette = req.body.etiquette;

      User.update(
        { etiquette: JSON.stringify(etiquette) },
        { where: { user_id } }
      )
        .then((data) => {
          userinfo.etiquette = etiquette;
          patchToken(res, userinfo);
          return res.status(200).send({ etiquette });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send();
        });
    },
  },
};
