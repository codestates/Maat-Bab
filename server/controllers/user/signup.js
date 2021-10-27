const { User } = require('../../models');
module.exports = {
  post: (req, res) => {
    console.log(req.body);
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).send('Check email or password or name');
    }
    User.findOrCreate({
      where: { email },
      defaults: {
        email,
        password,
        name,
        oauth: false,
        certification: false,
      },
    })
      .then(([result, created]) => {
        if (!created) {
          return res.status(409).send('Email exists');
        }
        delete result.dataValues.password;
        return res.status(201).send(result);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send('Internal Server Error');
      });
  },
};
