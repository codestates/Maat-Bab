const { Taste } = require('../../models');
module.exports = {
  get: (req, res) => {
    console.log('taste');
    Taste.findAll({ order: [['taste_id']] })
      .then((data) => {
        if (!data.length) {
          return res.status(404).send('No contents');
        }
        return res.status(200).send(data);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send('Internal Server Error');
      });
  },
};
