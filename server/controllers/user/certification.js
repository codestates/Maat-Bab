const { User } = require('../../models');

module.exports = {
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
    delete userinfo.dataValues.password;
    userinfo.etiquette = JSON.parse(userinfo.etiquette);

    return res.status(200).send(userinfo);
  },
};
