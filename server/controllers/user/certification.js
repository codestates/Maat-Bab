const { User } = require('../../models');
const { patchToken } = require('../../functions');

module.exports = {
  patch: async (req, res) => {
    const { email } = req.body;
    await User.update({ certification: true }, { where: { email } }).catch(
      (err) => {
        console.log(err);
        return res.status(500).send();
      }
    );

    let userinfo = await User.findOne({ where: { email } });
    if (!userinfo) {
      return res.status(500).send();
    }
    userinfo = userinfo.dataValues;
    delete userinfo.password;
    delete userinfo.salt;
    userinfo.etiquette = JSON.parse(userinfo.etiquette);

    patchToken(res, userinfo);
    return res.status(200).send(userinfo);
  },
};
