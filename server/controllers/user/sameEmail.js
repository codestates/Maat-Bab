const { User } = require('../models');

module.exports = {
  post: (req, res) => {
    const email = req.body.email;
    if (!email) {
      return res.status(400).send('Enter your email');
    } else {
      User.findOne({ where: email }).then((data) => {
        if (data) {
          return res.status(200).send('Unavailable email');
        }
        return res.status(204).send('Available email');
      });
    }
  },
};
