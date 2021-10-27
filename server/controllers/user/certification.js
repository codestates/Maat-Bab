const { User } = require('../../models');

module.exports = {
  email: {
    patch: async (req, res) => {
      const { email } = req.params;
      await User.update({ certification: true }, { where: { email } }).catch(
        (err) => {
          console.log(err);
          return res.status(500).send('Internal server Error');
        }
      );
      const userinfo = await User.findOne({ where: { email } });
      if (!userinfo) {
        return res.status(500).send('Internal server Error');
      }
      return res.status(200).send(userinfo);
    },
  },
};
