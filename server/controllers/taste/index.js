const { Taste } = require('../../models');
module.exports = {
  get: (req, res) => {
    Taste.findAll({ order: [['taste_id']] })
      .then((data) => {
        if (!data.length) {
          return res.status(404).send();
        }
        return res.status(200).send(data);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send();
      });
  },
};
