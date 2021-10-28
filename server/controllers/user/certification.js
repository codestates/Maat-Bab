const { User } = require('../../models');

module.exports = {
  email: {
    patch: async (req, res) => {
      const { email } = req.body;
      await User.update({ certification: true }, { where: { email } }).catch(
        (err) => {
          console.log(err);
          return res.status(500).send();
        }
      );
      const userinfo = await User.findOne({ where: { email } });
      if (!userinfo) {
        return res.status(500).send();
      }
      return res.status(200).send(userinfo);
    },
  },
};
