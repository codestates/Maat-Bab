const { User } = require('../../models');
const { generateSalt, generateHashData } = require('../../functions');

module.exports = {
  post: (req, res) => {
    let { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).send();
    }
    const salt = generateSalt();
    password = generateHashData(salt + password);

    User.findOrCreate({
      where: { email },
      defaults: {
        email,
        password,
        salt,
        name,
        etiquette: '[]',
        oauth: null,
        certification: false,
      },
    })
      .then(([result, created]) => {
        if (!created) {
          return res.status(409).send();
        }
        delete result.dataValues.password;
        delete result.dataValues.salt;
        result.dataValues.etiquette = JSON.parse(result.dataValues.etiquette);
        return res.status(201).send(result);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send();
      });
  },
};
