const { User } = require('../../models');

module.exports = {
  post: (req, res) => {
    const reqEmail = req.body.email;
    if (!reqEmail) {
      return res.status(400).send('Enter your email');
    } else {
      User.findOne({ where: { email: reqEmail } }).then((data) => {
        if (data) {
          return res.status(200).send('Unavailable email');
        }
        return res.status(204).send('Available email');
      });
    }
  },
};
