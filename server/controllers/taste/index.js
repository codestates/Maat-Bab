const { Taste } = require('../../models');
const { getOrSetCache } = require('../../functions');

module.exports = {
  get: async (req, res) => {
    const data = await getOrSetCache(req, 'taste', async () => {
      const tastes = await Taste.findAll({ order: [['taste_id']] });
      return tastes;
    });
    return res.status(200).send(data);
  },
};
