const { User } = require('../../models');
module.exports = {
  post: (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).send();
    }
    User.findOrCreate({
      where: { email },
      defaults: {
        email,
        password,
        name,
        etiquette: null,
        oauth: false,
        certification: false,
      },
    })
      .then(([result, created]) => {
        if (!created) {
          return res.status(409).send();
        }
        delete result.dataValues.password;
        return res.status(201).send(result);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send();
      });
  },
};
