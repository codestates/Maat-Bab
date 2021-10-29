const { Restaurant, Card, User_card } = require('../../models');
const { isAuth } = require('../../functions');
module.exports = {
  get: async (req, res) => {
    const { region, date, restaurant_name } = req.query;
    if (!region && !date && !restaurant_name) {
      const cards = await Card.findAll();
      if (!cards.length) {
        return res.status(404).send();
      }
      return res.status(200).send(cards);
    } else if (region && !date && !restaurant_name) {
      const cards = await Card.findAll({ where: { region } });
      if (!cards.length) {
        return res.status(404).send();
      }
      return res.status(200).send(cards);
    } else if (!region && date && !restaurant_name) {
      const cards = await Card.findAll({ where: { date } });
      if (!cards.length) {
        return res.status(404).send();
      }
      return res.status(200).send(cards);
    } else if (!region && !date && restaurant_name) {
      const cards = await Card.findAll({ where: { restaurant_name } });
      if (!cards.length) {
        return res.status(404).send();
      }
      return res.status(200).send(cards);
    } else if (region && date && !restaurant_name) {
      const cards = await Card.findAll({ where: { region, date } });
      if (!cards.length) {
        return res.status(404).send();
      }
      return res.status(200).send(cards);
    } else if (!region && date && restaurant_name) {
      const cards = await Card.findAll({ where: { date, restaurant_name } });
      if (!cards.length) {
        return res.status(404).send();
      }
      return res.status(200).send(cards);
    } else if (region && !date && restaurant_name) {
      const cards = await Card.findAll({ where: { region, restaurant_name } });
      if (!cards.length) {
        return res.status(404).send();
      }
      return res.status(200).send(cards);
    } else {
      const cards = await Card.findAll({
        where: { region, date, restaurant_name },
      });
      if (!cards.length) {
        return res.status(404).send();
      }
      return res.status(200).send(cards);
    }
  },
  post: async (req, res) => {
    const data = isAuth(req, res);
    if (!data) {
      return res.status(401).send();
    }
    const { user_id } = data;
    console.log('user_id', user_id);
    const {
      region,
      date,
      time,
      headcount,
      restaurant_name,
      chat_title,
      chat_content,
    } = req.body;
    if (!region || !date || !headcount || !chat_title) {
      return res.status(400).send();
    }

    if (restaurant_name) {
      Restaurant.findOrCreate({
        where: { restaurant_name },
        defaults: {
          restaurant_name,
          visit: 0,
        },
      })
        .then(([result, created]) => {
          if (!created) {
            const { visit } = result;
            Restaurant.update(
              { visit: visit + 1 },
              { where: { restaurant_name } }
            );
          }
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send();
        });
    }

    const { card_id } = await Card.create({
      region,
      date,
      time,
      headcount,
      restaurant_name,
      chat_title,
      chat_content,
    }).catch((err) => {
      console.log(err);
      return res.status(500).send();
    });

    await User_card.create({ card_id, user_id, host: true }).catch((err) => {
      console.log(err);
      return res.status(500).send();
    });

    const card = await Card.findOne({ where: { card_id } }).catch((err) => {
      console.log(err);
      return res.status(500).send();
    });
    return res.status(201).send(card);
  },
  user_id: {
    get: async (req, res) => {
      if (!isAuth(req, res)) {
        return res.status(401).send();
      }

      const { user_id } = req.params;
      const cards = await User_card.findAll({
        where: { user_id },
        include: { model: Card },
      });
      if (!cards.length) {
        return res.status(404).send();
      }
      return res.status(200).send(cards);
    },
    post: (req, res) => {
      if (!isAuth(req, res)) {
        return res.status(401).send();
      }

      const { user_id } = req.params;
      const { card_id } = req.body;
      User_card.findOrCreate({
        where: { user_id, card_id },
        defaults: { user_id, card_id, host: false },
      }).then(([result, created]) => {
        if (!created) {
          return res.status(409).send();
        }
        return res.status(200).send(result);
      });
    },
  },
};
