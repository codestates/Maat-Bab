const { Restaurant, Card, User_card, User } = require('../../models');
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

    await User_card.create({
      card_id,
      user_id,
      host: true,
      chat_content_idx: 0,
    }).catch((err) => {
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
    post: async (req, res) => {
      if (!isAuth(req, res)) {
        return res.status(401).send();
      }

      const { user_id } = req.params;
      const { card_id } = req.body;

      let { chat_content } = await Card.findOne({
        attributes: ['chat_content'],
        where: { card_id },
      });

      if (chat_content === null) {
        chat_content = [];
      } else {
        chat_content = JSON.parse(chat_content);
      }
      const chat_content_idx = chat_content.length;

      await User_card.findOrCreate({
        where: { user_id, card_id },
        defaults: { user_id, card_id, host: false, chat_content_idx },
      })
        .then(async ([result, created]) => {
          if (!created) {
            return res.status(409).send();
          }

          const { name } = await User.findOne({
            attributes: ['name'],
            where: { user_id },
          }).catch((err) => {
            console.log(err);
            return res.status(500).send();
          });

          const message = {
            card_id,
            user_id: 0,
            type: 'message',
            message: `${name}님이 방에 참여하셨습니다`,
            date: new Date(Date.now()).toLocaleDateString(),
            time: `${new Date(Date.now()).getHours()}:${new Date(
              Date.now()
            ).getMinutes()}`,
          };

          chat_content = JSON.stringify(chat_content.concat(message));

          await Card.update({ chat_content }, { where: { card_id } }).catch(
            (err) => {
              console.log(err);
              return res.status(500).send();
            }
          );
          req.app.get('io').to(card_id).emit('new_user', message);

          return res.status(200).send(result);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send();
        });
    },
  },
};
